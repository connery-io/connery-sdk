import { Controller, Get, Inject } from '@nestjs/common';
import { ObjectResponse, PluginResponse, convertPluginRuntimeToPluginResponse } from '../../types/api.js';
import { Plugin } from '../../runtime/plugin.js';

@Controller()
export class PluginsController {
  constructor(@Inject(Plugin) private plugin: Plugin) {}

  @Get('/plugin')
  getPluginV1(): ObjectResponse<PluginResponse> {
    return {
      status: 'success',
      data: convertPluginRuntimeToPluginResponse(this.plugin),
    };
  }
}
