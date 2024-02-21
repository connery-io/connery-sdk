import { Controller, Get, Inject, Param } from '@nestjs/common';
import { IPluginCache } from ':src/api/plugin-cache/plugin-cache.interface';
import {
  ObjectResponse,
  PaginatedResponse,
  PluginListResponseType,
  PluginResponseType,
  convertPlugin,
  convertPluginForList,
} from ':src/types/api-types';

@Controller()
export class PluginsController {
  constructor(@Inject(IPluginCache) private pluginCache: IPluginCache) {}

  //
  // Public methods
  //

  @Get('/v1/plugins')
  async getPluginsV1(): Promise<PaginatedResponse<PluginListResponseType>> {
    const plugins = await this.pluginCache.getPlugins();

    return {
      status: 'success',
      data: plugins.map(convertPluginForList),
    };
  }

  @Get('/v1/plugins/:pluginId')
  async getPluginV1(@Param('pluginId') pluginId: string): Promise<ObjectResponse<PluginResponseType>> {
    const plugin = await this.pluginCache.getPlugin(pluginId);

    return {
      status: 'success',
      data: convertPlugin(plugin),
    };
  }
}
