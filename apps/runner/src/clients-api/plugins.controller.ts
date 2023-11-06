import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { map } from 'lodash';
import { IPluginCache } from ':src/shared/plugin-cache/plugin-cache.interface';
import { ObjectResponse, PaginatedResponse } from ':src/shared/types';
import { ActionDefinition, InputParametersObject } from '@connery-io/sdk';
import { ActionOutput } from 'lib';

type PluginListResponseType = {
  key: string;
  title: string;
  description?: string;
};

type PluginResponseType = PluginListResponseType & {
  actions: ActionResponseType[];
};

type ActionResponseType = Omit<ActionDefinition, 'operation'>;

@Controller('/v1/plugins')
export class PluginsController {
  constructor(@Inject(IPluginCache) private pluginCache: IPluginCache) {}

  @Get('/')
  async getPlugins(): Promise<PaginatedResponse<PluginListResponseType>> {
    const plugins = await this.pluginCache.getPlugins();

    return {
      status: 'success',
      data: map(plugins, (plugin) => {
        return {
          key: plugin.key,
          title: plugin.definition.title,
          description: plugin.definition.description,
        };
      }),
    };
  }

  // We need to use two params here because the plugin contains a slash
  // (e.g. "connery-io/connery-runner-administration@main")
  @Get('/:pluginKeyPart1/:pluginKeyPart2')
  async getPlugin(
    @Param('pluginKeyPart1') pluginKeyPart1: string,
    @Param('pluginKeyPart2') pluginKeyPart2: string,
  ): Promise<ObjectResponse<PluginResponseType>> {
    const plugin = await this.pluginCache.getPlugin(`${pluginKeyPart1}/${pluginKeyPart2}`);

    return {
      status: 'success',
      data: {
        key: plugin.key,
        title: plugin.definition.title,
        description: plugin.definition.description,
        actions: map(plugin.definition.actions, convertAction),
      },
    };
  }

  // We need to use two params here because the plugin contains a slash
  // (e.g. "connery-io/connery-runner-administration@main")
  @Get('/:pluginKeyPart1/:pluginKeyPart2/actions/:actionKey')
  async getAction(
    @Param('pluginKeyPart1') pluginKeyPart1: string,
    @Param('pluginKeyPart2') pluginKeyPart2: string,
    @Param('actionKey') actionKey: string,
  ): Promise<ObjectResponse<ActionResponseType>> {
    const plugin = await this.pluginCache.getPlugin(`${pluginKeyPart1}/${pluginKeyPart2}`);
    const action = plugin.getAction(actionKey);

    return {
      status: 'success',
      data: convertAction(action.definition),
    };
  }

  // We need to use two params here because the plugin contains a slash
  // (e.g. "connery-io/connery-runner-administration@main")
  @Post('/:pluginKeyPart1/:pluginKeyPart2/actions/:actionKey/run')
  async runAction(
    @Param('pluginKeyPart1') pluginKeyPart1: string,
    @Param('pluginKeyPart2') pluginKeyPart2: string,
    @Param('actionKey') actionKey: string,
    @Body() body: InputParametersObject,
  ): Promise<ObjectResponse<ActionOutput>> {
    const plugin = await this.pluginCache.getPlugin(`${pluginKeyPart1}/${pluginKeyPart2}`);
    const action = plugin.getAction(actionKey);
    const actionResult = await action.run(body);

    return {
      status: 'success',
      data: actionResult,
    };
  }
}

function convertAction(action: ActionDefinition): ActionResponseType {
  return {
    key: action.key,
    title: action.title,
    description: action.description,
    type: action.type,
    inputParameters: map(action.inputParameters, (inputParameter) => {
      return {
        key: inputParameter.key,
        title: inputParameter.title,
        description: inputParameter.description,
        type: inputParameter.type,
        validation: {
          required: inputParameter.validation?.required,
        },
      };
    }),
    outputParameters: map(action.outputParameters, (outputParameter) => {
      return {
        key: outputParameter.key,
        title: outputParameter.title,
        description: outputParameter.description,
        type: outputParameter.type,
        validation: {
          required: outputParameter.validation?.required,
        },
      };
    }),
  };
}