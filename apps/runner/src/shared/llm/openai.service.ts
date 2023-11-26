import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanMessage, SystemMessage } from 'langchain/schema';
import { InputParametersObject } from '@connery-io/sdk';
import { IPluginCache } from ':src/shared/plugin-cache/plugin-cache.interface';
import { IConfig } from ':src/shared/config/config.interface';
import { ActionIdentifiedOutput, ActionNotIdentifiedOutput, OpenAiFunctionSchema } from './types';
import { ILlm } from './llm.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IOpenAI } from './openai.interface';
import { ActionRuntime } from 'lib';

@Injectable()
export class OpenAiService implements ILlm, IOpenAI {
  constructor(@Inject(IPluginCache) private pluginCache: IPluginCache, @Inject(IConfig) private config: IConfig) {}

  async identifyAction(prompt: string): Promise<ActionIdentifiedOutput | ActionNotIdentifiedOutput> {
    console.log(JSON.stringify({ type: 'system', message: `Identifying action for prompt: '${prompt}'` }));

    const runnerConfig = this.config.getRunnerConfig();
    if (!runnerConfig.openAiApiKey) {
      throw new Error('The OPENAI_API_KEY is not configured on the runner.');
    }

    const chat = new ChatOpenAI({
      openAIApiKey: runnerConfig.openAiApiKey,
      modelName: 'gpt-3.5-turbo-0613',
    }).bind({
      functions: await this.getOpenAiFunctionsSpec(false),
    });

    const result = await chat.invoke([
      new SystemMessage(
        `You are a helpful assistant. Your task is to help the user find the requested function and identify its parameters from the user's prompt. Here is a current time in UTC in case you need it for the date or time-related parameters: ${new Date().toUTCString()}`,
      ),
      new HumanMessage(prompt),
    ]);

    const functionCall = result.additional_kwargs?.function_call;
    if (!functionCall) {
      console.error(JSON.stringify({ type: 'error', message: 'Function call is not found in the result.' }));

      return {
        identified: false,
        used: {
          prompt,
        },
      };
    }

    console.log(
      JSON.stringify({ type: 'system', message: `Identified function call: ${JSON.stringify(functionCall)}` }),
    );

    let action;
    try {
      action = await this.pluginCache.getAction(functionCall.name);

      console.log(
        JSON.stringify({
          type: 'system',
          message: `Identified action '${action.definition.key}' found in the plugin ${action.plugin.key}`,
        }),
      );
    } catch (error: any) {
      console.error(JSON.stringify({ type: 'error', message: error.message, stack: error.stack }));

      return {
        identified: false,
        used: {
          prompt,
        },
      };
    }

    const input: InputParametersObject = JSON.parse(functionCall.arguments);

    return {
      identified: true,
      actionId: action.id,
      input,
      used: {
        prompt,
      },
    };
  }

  async identifyActionInput(action: ActionRuntime, prompt?: string): Promise<InputParametersObject> {
    // Return empty object if the prompt is not provided.
    if (!prompt) {
      return {};
    }

    const runnerConfig = this.config.getRunnerConfig();
    if (!runnerConfig.openAiApiKey) {
      throw new Error('The OPENAI_API_KEY is not configured on the runner.');
    }

    const chat = new ChatOpenAI({
      openAIApiKey: runnerConfig.openAiApiKey,
      modelName: 'gpt-3.5-turbo-0613',
    }).bind({
      functions: [this.getOpenAiFunctionSpecForActionInputParameters(action)],
    });

    const result = await chat.invoke([
      new SystemMessage(
        `You are a helpful assistant. Your task is to help the user identify input parameters of the function from the user's prompt. Here is a current time in UTC in case you need it for the date or time-related parameters: ${new Date().toUTCString()}`,
      ),
      new HumanMessage(prompt),
    ]);

    const functionCall = result.additional_kwargs?.function_call;
    if (!functionCall) {
      console.error(JSON.stringify({ type: 'error', message: 'Function call is not found in the result.' }));

      // Return empty object if the function call is not found.
      return {};
    }

    console.log(
      JSON.stringify({ type: 'system', message: `Identified function call: ${JSON.stringify(functionCall)}` }),
    );

    const identifiedInput: InputParametersObject = JSON.parse(functionCall.arguments);
    return identifiedInput;
  }

  async getOpenAiFunctionsSpec(includeRequiredConfig: boolean): Promise<OpenAiFunctionSchema[]> {
    const actions = await this.pluginCache.getActions();

    const openAiFunctions: OpenAiFunctionSchema[] = [];

    for (const action of actions) {
      const openAiFunction: OpenAiFunctionSchema = {
        name: action.id, // We use Action ID as a function name to avoid collisions between plugins.
        description: this.getDescription(action.definition.title, action.definition.description),
        parameters: {
          type: 'object',
          properties: {},
          required: [],
        },
      };

      for (const inputParameter of action.definition.inputParameters) {
        openAiFunction.parameters.properties[inputParameter.key] = {
          type: 'string',
          description: this.getDescription(inputParameter.title, inputParameter.description),
        };

        // Internal action identification works better when we don't include required parameters.
        // TODO: Come up with a better way of action identification with required parameters.
        if (includeRequiredConfig) {
          if (inputParameter.validation?.required) {
            openAiFunction.parameters.required.push(inputParameter.key);
          }
        }
      }

      openAiFunctions.push(openAiFunction);
    }

    return openAiFunctions;
  }

  private getOpenAiFunctionSpecForActionInputParameters(action: ActionRuntime): OpenAiFunctionSchema {
    const openAiFunction: OpenAiFunctionSchema = {
      name: action.id,
      description: this.getDescription(action.definition.title, action.definition.description),
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    };

    for (const inputParameter of action.definition.inputParameters) {
      openAiFunction.parameters.properties[inputParameter.key] = {
        type: 'string',
        description: this.getDescription(inputParameter.title, inputParameter.description),
      };

      if (inputParameter.validation?.required) {
        openAiFunction.parameters.required.push(inputParameter.key);
      }
    }

    return openAiFunction;
  }

  private getDescription(title: string, description?: string): string {
    return description ? `${title}: ${description}` : title;
  }
}
