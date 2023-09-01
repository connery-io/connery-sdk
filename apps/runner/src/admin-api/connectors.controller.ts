import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ConnectorsService } from '../shared/connectors.service';

@Controller('/v1/admin/connectors')
export class ConnectorsController {
  constructor(private connectorsService: ConnectorsService) {}

  @Get('/refresh')
  async refreshConnectorsCache(): Promise<void> {
    try {
      this.connectorsService.cleanConnectors();
      await this.connectorsService.initializeConnectors();
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
