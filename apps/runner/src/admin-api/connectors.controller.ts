import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { PluginInMemoryCacheService } from '../shared/plugin-in-memory-cache.service';

@Controller('/admin/connectors')
export class ConnectorsController {
  constructor(private connectorsService: PluginInMemoryCacheService) {}

  @Get('/refresh')
  async refreshConnectorsCache(): Promise<void> {
    try {
      this.connectorsService.clean();
      await this.connectorsService.initialize();
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
