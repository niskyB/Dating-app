import { Inject, Injectable } from '@nestjs/common';
import { RedisClient } from 'redis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('RedisClient') private readonly redisRepository: RedisClient,
  ) {}

  /**
   * @param expired amount time for redis value to be expired (1 = 60s)
   */
  setValueByKey(key: string, value: any, expired?: number) {
    return new Promise<boolean>((res, rej) => {
      this.redisRepository.set(key, value, (error) => {
        if (error) {
          return rej(false);
        }
        if (expired) {
          this.redisRepository.expire(key, expired * 60);
          return res(true);
        }
      });
    });
  }

  getValueByKey(key: string) {
    return new Promise((res, rej) => {
      this.redisRepository.get(key, (error, data) => {
        if (error) {
          return rej(null);
        }
        return res(data);
      });
    });
  }

  deleteByKey(key: string) {
    return new Promise<boolean>((res, rej) => {
      this.redisRepository.del(key, (error) => {
        if (error) {
          return rej(false);
        }
        return res(true);
      });
    });
  }
}
