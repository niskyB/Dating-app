import * as dotenv from 'dotenv';

dotenv.config({
  path: `${__dirname}/../config/.env.${process.env.NODE_ENV}`,
});

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { router } from './routes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  router(app);
  const port = process.env.PORT || 3001;
  const logger = new Logger('SERVER');

  await app.listen(port, () => {
    logger.log(`Listening on port ${port}`);
    logger.log(`Current NODE_ENV: ${process.env.NODE_ENV}`);
    logger.log(`Current debug status: ${process.env.DOC}`);
    logger.log(`Cors allows access: ${process.env.CLIENT_URL}`);
    logger.log(
      `Database Information: ${process.env.DB_HOST} - ${process.env.DB_NAME}`,
    );
    logger.log('Ready for service');
  });
}
bootstrap();
