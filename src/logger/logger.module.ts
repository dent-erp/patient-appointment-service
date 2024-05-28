import {Module} from '@nestjs/common';
import {LoggerService} from "./logger.service";
import {LoggingExceptionFilter} from "./logging-exception.filter";
import {LoggingController} from "./logging.controller";

@Module({
    controllers: [LoggingController],
    providers: [
        LoggerService,
        LoggingExceptionFilter
    ],
    exports: [
        LoggingExceptionFilter,
        LoggerService
    ],
})
export class LoggerModule {
}
