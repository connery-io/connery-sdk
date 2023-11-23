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

@Controller()
export class PluginsController {
  constructor(@Inject(IPluginCache) private pluginCache: IPluginCache) {}

  //
  // Public methods
  //

  @Get('/v1/plugins/')
  async getPluginsV1(): Promise<PaginatedResponse<PluginListResponseType>> {
    return this.getPlugins();
  }

  // We need to use two params here because the plugin contains a slash
  // (e.g. "connery-io/connery-runner-administration@main")
  @Get('/v1/plugins/:pluginKeyPart1/:pluginKeyPart2')
  async getPluginV1(
    @Param('pluginKeyPart1') pluginKeyPart1: string,
    @Param('pluginKeyPart2') pluginKeyPart2: string,
  ): Promise<ObjectResponse<PluginResponseType>> {
    const pluginKey = `${pluginKeyPart1}/${pluginKeyPart2}`;
    return this.getPlugin(pluginKey);
  }

  // We need to use two params here because the plugin contains a slash
  // (e.g. "connery-io/connery-runner-administration@main")
  @Get('/v1/plugins/:pluginKeyPart1/:pluginKeyPart2/actions/:actionKey')
  async getActionV1(
    @Param('pluginKeyPart1') pluginKeyPart1: string,
    @Param('pluginKeyPart2') pluginKeyPart2: string,
    @Param('actionKey') actionKey: string,
  ): Promise<ObjectResponse<ActionResponseType>> {
    const pluginKey = `${pluginKeyPart1}/${pluginKeyPart2}`;
    return this.getAction(pluginKey, actionKey);
  }

  @Post('/v1/plugins/:pluginKeyPart1/:pluginKeyPart2/actions/:actionKey/run')
  async runActionV1(
    @Param('pluginKeyPart1') pluginKeyPart1: string,
    @Param('pluginKeyPart2') pluginKeyPart2: string,
    @Param('actionKey') actionKey: string,
    @Body() body: InputParametersObject,
  ): Promise<ObjectResponse<ActionOutput>> {
    const pluginKey = `${pluginKeyPart1}/${pluginKeyPart2}`;
    return this.runAction(pluginKey, actionKey, body);
  }

  //
  // Private methods
  //

  private async getPlugins(): Promise<PaginatedResponse<PluginListResponseType>> {
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

  private async getPlugin(pluginKey: string): Promise<ObjectResponse<PluginResponseType>> {
    const plugin = await this.pluginCache.getPlugin(pluginKey);

    return {
      status: 'success',
      data: {
        key: plugin.key,
        title: plugin.definition.title,
        description: plugin.definition.description,
        actions: map(plugin.definition.actions, this.convertAction),
      },
    };
  }

  private async getAction(pluginKey: string, actionKey: string): Promise<ObjectResponse<ActionResponseType>> {
    const plugin = await this.pluginCache.getPlugin(pluginKey);
    const action = plugin.getAction(actionKey);

    return {
      status: 'success',
      data: this.convertAction(action.definition),
    };
  }

  private async runAction(
    pluginKey: string,
    actionKey: string,
    body: InputParametersObject,
  ): Promise<ObjectResponse<ActionOutput>> {
    const plugin = await this.pluginCache.getPlugin(pluginKey);
    const action = plugin.getAction(actionKey);
    const actionResult = await action.run(body);

    return {
      status: 'success',
      data: actionResult,
    };
  }

  private convertAction(action: ActionDefinition): ActionResponseType {
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
}
