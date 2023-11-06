import { IPluginCache } from ':src/shared/plugin-cache/plugin-cache.interface';
import { ObjectResponse } from ':src/shared/types';
import { Controller, Get, Inject } from '@nestjs/common';

@Controller('/v1/admin/plugins')
export class PluginsController {
  constructor(@Inject(IPluginCache) private pluginCache: IPluginCache) {}

  @Get('/refresh')
  async refreshPluginCache(): Promise<ObjectResponse<undefined>> {
    await this.pluginCache.clear();
    await this.pluginCache.initialize();

    return {
      status: 'success',
      data: undefined,
    };
  }
}
