import { Injectable } from '@nestjs/common';
import { RedisService } from '../utils/redis/redis.service';
import { MessagesDto } from './dto/messages.dto';
import { MessageRepository } from './repository/message.repository';

@Injectable()
export class ChatService {
  constructor(
    private readonly redisService: RedisService,
    private readonly messageRepository: MessageRepository,
  ) {}

  async setChat(room: string, messages: MessagesDto) {
    return await this.redisService.setObjectByKey(room, messages, 120);
  }

  async getChat(room: string, page: number, limit: number) {
    let result = await this.redisService.getObjectByKey<MessagesDto>(room);
    const resMesLength = result.messages.length;
    if (!resMesLength || (resMesLength && resMesLength < (page + 1) * limit)) {
      const messages = await this.messageRepository.findMessagesByRoom(
        room,
        page * limit,
        limit,
      );
      if (!resMesLength && !messages.length) return [];
      if (!resMesLength) result.messages = messages;
      if (resMesLength && messages.length) result.messages.concat(messages);
      await this.setChat(room, result);
    }

    return result.messages;
  }
}
