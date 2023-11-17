import { Inject, Injectable } from '@nestjs/common';
import { IPluginCache } from './plugin-cache/plugin-cache.interface';
import { OpenAiFunctionSchema } from './types';

@Injectable()
export class OpenAiFucntionsForActions {
  constructor(@Inject(IPluginCache) private pluginCache: IPluginCache) {}

  async getOpenAiFunctionsSchema(): Promise<OpenAiFunctionSchema[]> {
    const actions = await this.pluginCache.getActions();

    const openAiFunctions: OpenAiFunctionSchema[] = [];

    for (const action of actions) {
      const openAiFunction: OpenAiFunctionSchema = {
        name: action.definition.key,
        description: action.definition.description || '',
        parameters: {
          type: 'object',
          properties: {},
          required: [],
        },
      };

      for (const inputParameter of action.definition.inputParameters) {
        openAiFunction.parameters.properties[inputParameter.key] = {
          type: 'string',
          description: inputParameter.description || '',
        };

        if (inputParameter.validation?.required) {
          openAiFunction.parameters.required.push(inputParameter.key);
        }
      }

      openAiFunctions.push(openAiFunction);
    }

    return openAiFunctions;
  }
}
