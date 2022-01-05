import { Injectable } from '@nestjs/common';
import { RedisService } from '../utils/redis/redis.service';

@Injectable()
export class ChatService {
  constructor(private readonly redisService: RedisService) {}
}
