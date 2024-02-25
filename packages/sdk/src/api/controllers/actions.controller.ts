import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import {
  ActionResponse,
  ObjectResponse,
  PaginatedResponse,
  RunActionRequest,
  RunActionResponse,
  convertActionRuntimeToActionResponse,
} from '../../types/api.js';
import { PluginService } from '../services/plugin.service.js';

@Controller()
export class ActionsController {
  constructor(private pluginService: PluginService) {}

  @Get('/actions')
  getActions(): PaginatedResponse<ActionResponse> {
    const actions = this.pluginService.plugin.actions;

    return {
      status: 'success',
      data: actions.map(convertActionRuntimeToActionResponse),
    };
  }

  @Get('/actions/:key')
  getAction(@Param('key') key: string): ObjectResponse<ActionResponse> {
    const action = this.pluginService.plugin.findActionByKey(key);

    if (!action) {
      throw new HttpException('Action not found ', 404);
    }

    return {
      status: 'success',
      data: convertActionRuntimeToActionResponse(action),
    };
  }

  @Post('/actions/:key/run')
  async runAction(
    @Param('key') key: string,
    @Body() body: RunActionRequest,
  ): Promise<ObjectResponse<RunActionResponse>> {
    const action = this.pluginService.plugin.findActionByKey(key);

    if (!action) {
      throw new HttpException('Action not found', 404);
    }

    // TODO: get default config from the ENV config
    const defaultConfiguration = {};
    const result = await action.run(body.input, defaultConfiguration, body.configuration);

    return {
      status: 'success',
      data: result,
    };
  }
}
