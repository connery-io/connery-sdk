import { Controller, Get } from '@nestjs/common';
import { ConnectorsService } from '../shared/connectors.service';

@Controller('/runner/tools')
export class ToolsController {
  constructor(private connectorsService: ConnectorsService) {}

  @Get('/refresh-connectors-cache')
  async refreshConnectorsCache() {
    this.connectorsService.cleanConnectors();
    await this.connectorsService.initializeConnectors();
  }
}
