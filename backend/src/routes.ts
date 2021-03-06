import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { SocketExceptionFilter } from './common/exception/socket.exception';

export function router(app: INestApplication) {
  //common middleware
  app.enableCors({ origin: process.env.CLIENT_URL, credentials: true });
  app.setGlobalPrefix('/api');
  app.use(cookieParser());

  // global filter
  app.useGlobalFilters(new SocketExceptionFilter());

  //for production
  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(compression());
  }
}
