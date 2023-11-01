import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanMessage, SystemMessage } from 'langchain/schema';
import { ActionDefinition, InputParametersObject } from '@connery-io/sdk';
import { IPluginCache } from ':src/shared/plugin-cache/plugin-cache.interface';
import { IConfig } from ':src/shared/config/config.interface';
import { ActionIdentifiedOutput, ActionNotIdentifiedOutput } from './types';
import { ILlm } from './llm.interface';
import { Inject, Injectable } from '@nestjs/common';

type ExposedAction = {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: {
      [key: string]: {
        type: string;
        description: string;
      };
    };
    required: string[];
  };
};

@Injectable()
export class OpenAiService implements ILlm {
  constructor(@Inject(IPluginCache) private pluginCache: IPluginCache, @Inject(IConfig) private config: IConfig) {}

  async identifyAction(prompt: string): Promise<ActionIdentifiedOutput | ActionNotIdentifiedOutput> {
    // TODO implement

    console.log(JSON.stringify({ type: 'user_prompt_received', data: { prompt: prompt } }));

    const runnerConfig = this.config.getRunnerConfig();
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
      action = await this.pluginCache.getAction(functionCall.name);
    } catch (error) {
      return {
        identified: false,
        used: {
          prompt,
        },
      };
    }

    // TODO: Handle the case when the required parameters are not provided for the action
    const inputParameters: InputParametersObject = JSON.parse(functionCall.arguments);

    return {
      identified: true,
      pluginKey: action.plugin.key,
      actionKey: action.definition.key,
      inputParameters,
      used: {
        prompt,
      },
    };
  }

  private async getExposedActionsJsonSchema(): Promise<ExposedAction[]> {
    const exposedActions = [];

    const actions = await this.pluginCache.getActions();

    for (const action of actions) {
      const actionJsonSchema = this.convertActionToJsonSchema(action.definition);
      exposedActions.push(actionJsonSchema);
    }

    return exposedActions;
  }

  private convertActionToJsonSchema(actionDefinition: ActionDefinition): ExposedAction {
    const exposedAction: ExposedAction = {
      name: actionDefinition.key,
      description: actionDefinition.description || actionDefinition.title,
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    };

    for (const inputParameter of actionDefinition.inputParameters) {
      exposedAction.parameters.properties[inputParameter.key] = {
        type: inputParameter.type,
        description: inputParameter.description || inputParameter.title,
      };

      // NOTE: The following code is commented out to let OpenAI classify the user prompt as a function call
      // even if not all the required input parameters are provided by the user.
      // TODO: Find proper solution
      /*
      if (inputParameter.Validation?.Required) {
        exposedAction.parameters.required.push(inputParameter.Key);
      }
      */
    }

    return exposedAction;
  }
}
