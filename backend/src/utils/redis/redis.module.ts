import { Module } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisService } from './redis.service';

@Module({
  providers: [
    RedisService,
    {
      provide: 'RedisClient',
      useFactory: () => {
        const redis = createClient();
        redis.select(+process.env.REDIS_DB_NUMBER || 1);
        return redis;
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
