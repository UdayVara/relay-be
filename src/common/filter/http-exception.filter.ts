import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      let message = 'Internal server error';

      if (exception instanceof HttpException) {
        const exceptionResponse = exception.getResponse();

        if (typeof exceptionResponse === 'string') {
          message = exceptionResponse;
        } else if (
          typeof exceptionResponse === 'object' &&
          exceptionResponse !== null &&
          'message' in exceptionResponse
        ) {
          const exceptionMessage = exceptionResponse.message;

          if (Array.isArray(exceptionMessage)) {
            message = exceptionMessage.join(', ');
          } else if (typeof exceptionMessage === 'string') {
            message = exceptionMessage;
          }
        }
      }
    }

    response.status(status).json({
      message,
      url: request.url,
    });
  }
}
