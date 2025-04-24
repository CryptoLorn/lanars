import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let messages: string | string[];

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      if (exception instanceof BadRequestException) {
        const response = exception.getResponse() as
          | { message: string[] }
          | { message: string };

        messages = Array.isArray(response.message)
          ? response.message
          : [response.message];
      } else {
        messages = exception.message;
      }
    } else if (exception instanceof DatabaseError) {
      status = 500;
      messages = exception.message;
    } else {
      status = 500;
      messages = 'Internal server error';
    }

    messages = Array.isArray(messages) ? messages : [messages];

    response.status(status).json({
      statusCode: status,
      messages,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
