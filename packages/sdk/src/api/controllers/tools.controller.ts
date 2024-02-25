import { Public } from '../auth.guard.js';
import { ObjectResponse } from '../../types/api.js';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class ToolsController {
  // TODO return HTML page with the information about the plugin, docs, and links to the OpenAPI schema
  @Public()
  @Get('/')
  getMainPage(): ObjectResponse<{ message: string }> {
    return {
      status: 'success',
      data: {
        message: 'Welcome to the plugin API 👋',
      },
    };
  }

  @Public()
  @Get('/health')
  async check(): Promise<ObjectResponse<undefined>> {
    return {
      status: 'success',
      data: undefined,
    };
  }

  @Get('/verify-access')
  verifyAccess(): ObjectResponse<undefined> {
    // By default every API endpoint is protected by the AuthGuard. Including this one.
    // And the AuthGuard will throw an exception if the request is not authenticated.
    // This endpoint does not contain any business logic, it is only used to verify if the request is authenticated by the clients.

    return {
      status: 'success',
      data: undefined,
    };
  }
}
