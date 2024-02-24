import { Body, Controller, Get, HttpException, Inject, Param, Post } from '@nestjs/common';
import {
  ActionResponse,
  ObjectResponse,
  PaginatedResponse,
  RunActionRequest,
  RunActionResponse,
  convertActionRuntimeToActionResponse,
} from ':src/types/api';
import { Plugin } from ':src/runtime/plugin';

@Controller()
export class ActionsController {
  constructor(@Inject(Plugin) private plugin: Plugin) {}

  @Get('/actions')
  getActions(): PaginatedResponse<ActionResponse> {
    const actions = this.plugin.actions;

    return {
      status: 'success',
      data: actions.map(convertActionRuntimeToActionResponse),
    };
  }

  @Get('/actions/:key')
  getAction(@Param('key') key: string): ObjectResponse<ActionResponse> {
    const action = this.plugin.findActionByKey(key);

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
    const action = this.plugin.findActionByKey(key);

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
