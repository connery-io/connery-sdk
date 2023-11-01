import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from './shared/types';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status, message;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = (exception as Error).message;
    }

    const errorObject: ErrorResponse = {
      status: 'error',
      error: {
        message: message.toString(),
      },
    };

    response.status(status).json(errorObject);
  }
}
