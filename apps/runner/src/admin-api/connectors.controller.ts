import { IPluginCache } from ':src/shared/plugin-cache/plugin-cache.interface';
import { Controller, Get, HttpException, HttpStatus, Inject } from '@nestjs/common';

@Controller('/v1/admin/plugins')
export class PluginsController {
  constructor(@Inject(IPluginCache) private pluginCache: IPluginCache) {}

  @Get('/refresh')
  async refreshPluginCache(): Promise<void> {
    try {
      await this.pluginCache.clear();
      await this.pluginCache.initialize();
    } catch (error: any) {
      // TODO: Replace with proper solution
      throw new HttpException(
        {
          status: 'error',
          error: {
            message: error.message,
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
