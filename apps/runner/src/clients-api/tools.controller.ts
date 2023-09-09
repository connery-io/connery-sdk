import { Controller, Get } from '@nestjs/common';
import { ErrorResponse, ObjectResponse } from './types';

@Controller()
export class ToolsController {
  @Get('/verify-access')
  verifyAccess(): ObjectResponse<undefined> | ErrorResponse {
    // By default every API endpoint is protected by the AuthGuard. Including this one.
    // And the AuthGuard will throw an exception if the request is not authenticated.
    // This endpoint does not contain any business logic, it is only used to verify if the request is authenticated by the clients.

    return {
      status: 'success',
      data: undefined,
    };
  }
}
