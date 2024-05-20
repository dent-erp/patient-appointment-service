import {Injectable, Logger, NestMiddleware} from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { method, url, params, body } = req;
    const datetime = new Date().toISOString();

    Logger.log(`[${datetime}] ${method} ${url} ${JSON.stringify(params)} ${JSON.stringify(body)}`);
    next();
  }
}
