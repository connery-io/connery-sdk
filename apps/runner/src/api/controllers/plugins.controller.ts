import { Controller, Get } from '@nestjs/common';
import { ObjectResponse, PluginResponse, convertPluginRuntimeToPluginResponse } from '../../types/api.js';
import { ConfigService } from './../services/config.service.js';

@Controller()
export class PluginsController {
  constructor(private configService: ConfigService) {}

  @Get('/plugin')
  getPluginV1(): ObjectResponse<PluginResponse> {
    return {
      status: 'success',
      data: convertPluginRuntimeToPluginResponse(this.configService.plugin),
    };
  }
}
