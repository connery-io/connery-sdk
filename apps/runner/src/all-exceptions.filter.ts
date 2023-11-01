import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from './shared/types';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status, message: string;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response: any = exception.getResponse();
      message = typeof response === 'string' ? response : response.error;
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
    console.error(JSON.stringify({ type: 'all-exceptions-filter', message }));
    response.status(status).json(errorObject);
  }
}
