import { Controller, Get } from '@nestjs/common';
import { ConnectorsService } from '../shared/connectors.service';

@Controller('/v1/admin/connectors')
export class ConnectorsController {
  constructor(private connectorsService: ConnectorsService) {}

  @Get('/refresh')
  async refreshConnectorsCache() {
    this.connectorsService.cleanConnectors();
    await this.connectorsService.initializeConnectors();
  }
}
