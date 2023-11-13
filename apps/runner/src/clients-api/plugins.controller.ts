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

  // This endpoint is deprecated and will be removed in the future
  // TODO: Remove this endpoint once all the clients are updated to use the new one
  @Get('/connectors')
  async getPluginsV0(): Promise<PaginatedResponse<PluginListResponseType>> {
    return this.getPlugins();
  }

  @Get('/v1/plugins/')
  async getPluginsV1(): Promise<PaginatedResponse<PluginListResponseType>> {
    return this.getPlugins();
  }

  // This endpoint is deprecated and will be removed in the future
  // TODO: Remove this endpoint once all the clients are updated to use the new one
  @Get('/connectors/:pluginKeyPart1/:pluginKeyPart2')
  async getPluginV0(
    @Param('pluginKeyPart1') pluginKeyPart1: string,
    @Param('pluginKeyPart2') pluginKeyPart2: string,
  ): Promise<ObjectResponse<PluginResponseType>> {
    return this.getPlugin(pluginKeyPart1, pluginKeyPart2);
  }

  @Get('/v1/plugins/:pluginKeyPart1/:pluginKeyPart2')
  async getPluginV1(
    @Param('pluginKeyPart1') pluginKeyPart1: string,
    @Param('pluginKeyPart2') pluginKeyPart2: string,
  ): Promise<ObjectResponse<PluginResponseType>> {
    return this.getPlugin(pluginKeyPart1, pluginKeyPart2);
  }

  // This endpoint is deprecated and will be removed in the future
  // TODO: Remove this endpoint once all the clients are updated to use the new one
  @Get('/connectors/:pluginKeyPart1/:pluginKeyPart2/actions/:actionKey')
  async getActionV0(
    @Param('pluginKeyPart1') pluginKeyPart1: string,
    @Param('pluginKeyPart2') pluginKeyPart2: string,
    @Param('actionKey') actionKey: string,
  ): Promise<ObjectResponse<ActionResponseType>> {
    return this.getAction(pluginKeyPart1, pluginKeyPart2, actionKey);
  }

  @Get('/v1/plugins/:pluginKeyPart1/:pluginKeyPart2/actions/:actionKey')
  async getActionV1(
    @Param('pluginKeyPart1') pluginKeyPart1: string,
    @Param('pluginKeyPart2') pluginKeyPart2: string,
    @Param('actionKey') actionKey: string,
  ): Promise<ObjectResponse<ActionResponseType>> {
    return this.getAction(pluginKeyPart1, pluginKeyPart2, actionKey);
  }

  // This endpoint is deprecated and will be removed in the future
  // TODO: Remove this endpoint once all the clients are updated to use the new one
  @Post('/connectors/:pluginKeyPart1/:pluginKeyPart2/actions/:actionKey/run')
  async runActionV0(
    @Param('pluginKeyPart1') pluginKeyPart1: string,
    @Param('pluginKeyPart2') pluginKeyPart2: string,
    @Param('actionKey') actionKey: string,
    @Body() body: InputParametersObject,
  ): Promise<ObjectResponse<ActionOutput>> {
    return this.runAction(pluginKeyPart1, pluginKeyPart2, actionKey, body);
  }

  @Post('/v1/plugins/:pluginKeyPart1/:pluginKeyPart2/actions/:actionKey/run')
  async runActionV1(
    @Param('pluginKeyPart1') pluginKeyPart1: string,
    @Param('pluginKeyPart2') pluginKeyPart2: string,
    @Param('actionKey') actionKey: string,
    @Body() body: InputParametersObject,
  ): Promise<ObjectResponse<ActionOutput>> {
    return this.runAction(pluginKeyPart1, pluginKeyPart2, actionKey, body);
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

  // We need to use two params here because the plugin contains a slash
  // (e.g. "connery-io/connery-runner-administration@main")
  private async getPlugin(
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
        actions: map(plugin.definition.actions, this.convertAction),
      },
    };
  }

  // We need to use two params here because the plugin contains a slash
  // (e.g. "connery-io/connery-runner-administration@main")
  private async getAction(
    @Param('pluginKeyPart1') pluginKeyPart1: string,
    @Param('pluginKeyPart2') pluginKeyPart2: string,
    @Param('actionKey') actionKey: string,
  ): Promise<ObjectResponse<ActionResponseType>> {
    const plugin = await this.pluginCache.getPlugin(`${pluginKeyPart1}/${pluginKeyPart2}`);
    const action = plugin.getAction(actionKey);

    return {
      status: 'success',
      data: this.convertAction(action.definition),
    };
  }

  // We need to use two params here because the plugin contains a slash
  // (e.g. "connery-io/connery-runner-administration@main")
  private async runAction(
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
