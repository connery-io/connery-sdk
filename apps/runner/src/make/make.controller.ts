import { Body, Controller, Get, Param, Post, Headers } from '@nestjs/common';
import { MakeService } from './make.service';
import { RunInput } from ':src/openai/types';
import { LocalConfigService } from ':src/shared/local-config.service';

@Controller('/runner/make')
export class MakeController {
  constructor(private makeService: MakeService, private configService: LocalConfigService) {}

  @Get('/verify-api-key')
  verifyApiKey(@Headers('x-api-key') apiKey: string) {
    this.configService.verifyAccess(apiKey);
  }

  @Get('/actions')
  async getActions(@Headers('x-api-key') apiKey: string) {
    this.configService.verifyAccess(apiKey);

    return await this.makeService.getActions();
  }

  @Post('/actions/:actionKey/run')
  async runAction(@Headers('x-api-key') apiKey: string, @Param('actionKey') actionKey: string, @Body() body: RunInput) {
    this.configService.verifyAccess(apiKey);

    return await this.makeService.runAction(actionKey, body);
  }

  @Get('/actions/:actionKey/input')
  async getInputMetadata(@Headers('x-api-key') apiKey: string, @Param('actionKey') actionKey: string) {
    this.configService.verifyAccess(apiKey);

    return await this.makeService.getInputMetadata(actionKey);
  }

  @Get('/actions/:actionKey/output')
  async getOutputMetadata(@Headers('x-api-key') apiKey: string, @Param('actionKey') actionKey: string) {
    this.configService.verifyAccess(apiKey);

    return await this.makeService.getOutputMetadata(actionKey);
  }
}
