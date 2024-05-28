import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {Controller, DefaultValuePipe, Get, Query, UseGuards} from "@nestjs/common";
import {AuthGuard} from "../auth/auth.guard";
import {LoggerService} from "./logger.service";
import { Res } from '@nestjs/common';
import { Response } from 'express';

@ApiTags('logging')
@UseGuards(AuthGuard)
@Controller('logging')
export class LoggingController {

    constructor(private loggerService: LoggerService) {
    }

    @ApiOperation({summary: 'Get log file'})
    @Get('logs')
    async getLogFile(@Query('date', new DefaultValuePipe(() => {
        const today = new Date();
        return `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
    })) date: string, @Res() res: Response) {
        const filePath = this.loggerService.getLogFilePath(date);
        res.download(filePath);
    }
}