import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
export function router(app: INestApplication) {
  //set up cors
  app.enableCors({ origin: process.env.CLIENT_URL, credentials: true });
  app.setGlobalPrefix('/api');
  app.use(cookieParser());
}
