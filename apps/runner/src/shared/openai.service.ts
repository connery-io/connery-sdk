import { Inject } from '@nestjs/common';
import { ActionSchemaType } from 'lib';
import { ConnectorsService } from ':src/shared/connectors.service';
import { LocalConfigService } from ':src/shared/local-config.service';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanMessage, SystemMessage } from 'langchain/schema';

// TODO: replace with the shared type(s),
// the same that is used in the API response
// TODO: add missing required input parameters, and all the other parameters that are not required
export type ActionIdentifiedOutput = {
  identified: true;
  connectorKey: string;
  actionKey: string;
  inputParameters: {
    [key: string]: string;
  };
  used: {
    prompt: string;
  };
};

// TODO: replace with the shared type(s),
// the same that is used in the API response
export type ActionNotIdentifiedOutput = {
  identified: false;
  used: {
    prompt: string;
  };
};

export class OpenAiService {
  constructor(
    @Inject(ConnectorsService) private connectorsService: ConnectorsService,
    private configService: LocalConfigService,
  ) {}

  async identifyAction(prompt: string): Promise<ActionIdentifiedOutput | ActionNotIdentifiedOutput> {
    // TODO implement

    console.log(JSON.stringify({ type: 'user_prompt_received', data: { prompt: prompt } }));

    const runnerConfig = this.configService.getRunnerConfig();
    if (!runnerConfig.OpenAiApiKey) {
      throw new Error('The OPENAI_API_KEY is not configured on the runner.');
    }

    const chat = new ChatOpenAI({
      openAIApiKey: runnerConfig.OpenAiApiKey,
      modelName: 'gpt-3.5-turbo-0613',
    }).bind({
      functions: await this.getExposedActionsJsonSchema(),
    });

    const result = await chat.invoke([
      new SystemMessage(
        `You are a helpful assistant. Your task is to help the user find the requested function and identify its parameters from the user's prompt. Here is a current time in UTC in case you need it for the date or time-related parameters: ${new Date().toUTCString()}`,
      ),
      new HumanMessage(prompt),
    ]);

    const functionCall = result.additional_kwargs?.function_call;
    if (!functionCall) {
      return {
        identified: false,
        used: {
          prompt,
        },
      };
    }

    let action;
    try {
      action = await this.connectorsService.getAction(functionCall.name);
    } catch (error) {
      return {
        identified: false,
        used: {
          prompt,
        },
      };
    }

    // TODO: Handle the case when the required parameters are not provided for the action
    const inputParameters = JSON.parse(functionCall.arguments);

    return {
      identified: true,
      connectorKey: action.connector.key,
      actionKey: action.key,
      inputParameters,
      used: {
        prompt,
      },
    };
  }

  private async getExposedActionsJsonSchema() {
    const exposedActions = [];

    const actions = await this.connectorsService.getActions();

    for (const action of actions) {
      const actionJsonSchema = this.convertActionToJsonSchema(action.schema);
      exposedActions.push(actionJsonSchema);
    }

    return exposedActions;
  }

  private convertActionToJsonSchema(action: ActionSchemaType) {
    const actionJsonSchema: any = {
      name: action.key,
      description: action.description,
    };
    actionJsonSchema.parameters = { type: 'object', properties: {}, required: [] };

    for (const inputParameter of action.inputParameters) {
      actionJsonSchema.parameters.properties[inputParameter.key] = {
        type: inputParameter.type,
        description: inputParameter.description,
      };

      // NOTE: I commented this out to let OpenAI classify the user prompt as a function call even if not all the required input parameters are provided
      //if (inputParameter.validation && inputParameter.validation.required) {
      //  actionJsonSchema.parameters.required.push(inputParameter.key);
      //}
    }

    return actionJsonSchema;
  }
}
