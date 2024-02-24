import { Public } from './../auth.guard.js';
import { ObjectResponse } from './../../types/api.js';
import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';

@Controller()
export class ToolsController {
  constructor(private health: HealthCheckService) {}

  // TODO return HTML page with the information about the plugin, docs, and links to the OpenAPI schema
  @Public()
  @Get('/')
  getMainPage(): ObjectResponse<{ message: string }> {
    return {
      status: 'success',
      data: {
        message: 'Welcome to the Connery Runner API 👋',
      },
    };
  }

  @Public()
  @Get('/health')
  @HealthCheck()
  async check(): Promise<ObjectResponse<undefined>> {
    await this.health.check([]);

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
