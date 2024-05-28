import {ArgumentsHost, Catch, ExceptionFilter, INestApplication, Injectable} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LoggerService } from './logger.service';
import { Request } from 'express';

@Injectable()
@Catch()
export class LoggingExceptionFilter extends BaseExceptionFilter {
  constructor(private readonly logger: LoggerService) {
    super();
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { method, originalUrl } = request;
    const message = `${method} ${originalUrl} ${exception.stack}`;

    this.logger.error(message, 'ExceptionFilter');

    super.catch(exception, host);
  }
}