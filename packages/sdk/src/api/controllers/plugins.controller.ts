import { Controller, Get } from '@nestjs/common';
import { ObjectResponse, PluginResponse, convertPluginRuntimeToPluginResponse } from '../../types/api.js';
import { PluginService } from '../services/plugin.service.js';

@Controller()
export class PluginsController {
  constructor(private pluginService: PluginService) {}

  @Get('/plugin')
  getPluginV1(): ObjectResponse<PluginResponse> {
    return {
      status: 'success',
      data: convertPluginRuntimeToPluginResponse(this.pluginService.plugin),
    };
  }
}
