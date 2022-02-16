import { Module } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisService } from './redis.service';

@Module({
  providers: [
    RedisService,
    {
      provide: 'RedisClient',
      useFactory: () => {
        console.log('redis port from env : ', process.env.REDIS_PORT);
        console.log('DB_HOST from env : ', process.env.DB_HOST);
        const redisPort = Number(process.env.REDIS_PORT) || 7000;
        const redis = createClient({
          port: redisPort,
          host: process.env.REDIS_HOST || '',
        });
        redis.select(process.env.REDIS_DB_NUMBER || 1);
        return redis;
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
