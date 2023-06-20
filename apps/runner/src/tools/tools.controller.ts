import { Controller, Get } from '@nestjs/common';
import { ConnectorsService } from '../shared/connectors.service';

// TODO - Add authentication
@Controller('/runner/tools')
export class ToolsController {
  constructor(private connectorsService: ConnectorsService) {}

  @Get('/connectors/download')
  async downloadConnectorsToRunner() {
    this.connectorsService.initializeConnectors();
  }

  @Get('/connectors/clean')
  async cleanConnectorsCache() {
    this.connectorsService.cleanConnectors();
  }

  @Get('/connectors/refresh')
  async refreshConnectors() {
    this.connectorsService.cleanConnectors();
    this.connectorsService.initializeConnectors();
  }
}
