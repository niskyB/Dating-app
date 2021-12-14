import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

export function router(app: INestApplication) {
  app.use(cookieParser());
}
