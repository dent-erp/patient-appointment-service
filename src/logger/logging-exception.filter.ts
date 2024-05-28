import {ArgumentsHost, Catch, ExceptionFilter, INestApplication, Inject, Injectable} from '@nestjs/common';
import {BaseExceptionFilter, HttpAdapterHost} from '@nestjs/core';
import {LoggerService} from './logger.service';
import {Request} from 'express';

@Injectable()
@Catch()
export class LoggingExceptionFilter extends BaseExceptionFilter {

    constructor(
        adapterHost: HttpAdapterHost,
        private readonly logger: LoggerService,
    ) {
        super(adapterHost.httpAdapter);
    }

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const {method, originalUrl} = request;
        const message = `${method} ${originalUrl} ${exception.stack}`;

        this.logger.error(message, 'ExceptionFilter');

        super.catch(exception, host);
    }
}