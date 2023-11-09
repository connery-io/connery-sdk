import { IPluginCache } from ':src/shared/plugin-cache/plugin-cache.interface';
import { ObjectResponse } from ':src/shared/types';
import { Controller, Get, Inject } from '@nestjs/common';

@Controller()
export class PluginsController {
  constructor(@Inject(IPluginCache) private pluginCache: IPluginCache) {}

  // This endpoint is deprecated and will be removed in the future
  // TODO: Remove this endpoint once all the clients are updated to use the new one
  @Get('/admin/connectors/refresh')
  async refreshPluginCacheV0(): Promise<ObjectResponse<undefined>> {
    return this.refreshPluginCache();
  }

  @Get('/v1/admin/plugins/refresh')
  async refreshPluginCacheV1(): Promise<ObjectResponse<undefined>> {
    return this.refreshPluginCache();
  }

  private async refreshPluginCache(): Promise<ObjectResponse<undefined>> {
    await this.pluginCache.clear();
    await this.pluginCache.initialize();

    return {
      status: 'success',
      data: undefined,
    };
  }
}
