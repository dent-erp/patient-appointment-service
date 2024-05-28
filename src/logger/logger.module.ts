import {HttpServer, INestApplication, Module} from '@nestjs/common';
import {LoggerService} from "./logger.service";
import {LoggingExceptionFilter} from "./logging-exception.filter";

@Module({
    providers: [
        LoggerService,
        LoggingExceptionFilter,
    ],
    exports: [LoggingExceptionFilter],
})
export class LoggerModule {
}
