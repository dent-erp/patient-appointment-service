import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';
import {format} from "date-fns";

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    const logDir = path.join(__dirname, '../../logs');

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    const date = new Date();
    const logFile = path.join(logDir, `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.log`);

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          const datetime = format(new Date(timestamp), 'dd-MM-yyyy HH:mm:ss');
          return `${datetime} [${level.toUpperCase()}] ${message}`;
        })
      ),
      transports: [
        new winston.transports.File({ filename: logFile })
      ]
    });
  }

  log(message: string, context: string = '') {
    this.logger.info(`${context} ${message}`);
  }

  warn(message: string, context: string = '') {
    this.logger.warn(`${context} ${message}`);
  }

  error(message: string, context: string = '') {
    this.logger.error(`${context} ${message}`);
  }
}