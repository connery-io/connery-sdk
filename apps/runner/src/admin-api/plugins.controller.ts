import { IPluginCache } from ':src/shared/plugin-cache/plugin-cache.interface';
import { ObjectResponse } from ':src/shared/api-types';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller()
export class PluginsController {
  constructor(@Inject(IPluginCache) private pluginCache: IPluginCache) {}

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
