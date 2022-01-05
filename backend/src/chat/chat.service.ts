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

    if (!result || (result && result.messages.length < (page + 1) * limit)) {
      const messages = await this.messageRepository.findMessagesByRoom(
        room,
        page * limit,
        limit,
      );
      if (!result && !messages) return null;
      if (!result) result = { messages };
      if (result && messages) result.messages.concat(messages);
      await this.setChat(room, result);
    }

    return result.messages;
  }
}
