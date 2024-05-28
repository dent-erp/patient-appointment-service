import {Injectable, Logger, NestMiddleware} from '@nestjs/common';
import {LoggerService} from "./logger.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {
  }


  use(req: any, res: any, next: () => void) {
    const { method, originalUrl, params, body } = req;
    const datetime = new Date().toISOString();

    this.logger.log(`${method} ${originalUrl} b:${JSON.stringify(body)}`);
    Logger.log(`[${datetime}] ${method} ${originalUrl} b:${JSON.stringify(body)}`);
    next();
  }
}
