import { Controller, Get } from '@nestjs/common';
import { MakeService } from './make.service';

@Controller('/runner/make/connectors/:repoOwner/:repoName/:repoBranch')
export class MakeController {
  constructor(private makeService: MakeService) {}

  @Get('/actions')
  getActions() {
    return this.makeService.actions;
  }

  @Get('/actions/:actionKey/metadata/input')
  async getInputMetadata() {
    return this.makeService.inputMetadata;
  }

  @Get('/actions/:actionKey/metadata/output')
  async getOutputMetadata() {
    return this.makeService.outputMetadata;
  }
}
