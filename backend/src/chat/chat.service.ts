import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import { RedisService } from '../utils/redis/redis.service';
import { MessagesDto } from './dto/messages.dto';
import { Message } from './entities/message.entity';
import { MessageRepository } from './repository/message.repository';

@Injectable()
export class ChatService {
  constructor(
    private readonly redisService: RedisService,
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
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
      if (!result && !messages.length) return [];
      if (!result) result = { messages };
      if (result && messages.length) result.messages.concat(messages);
      await this.setChat(room, result);
    }

    return result.messages;
  }

  async createMessage(room: string, content: string, userId: string) {
    const message = this.messageRepository.create();
    const user = await this.userRepository.findOneByField('id', userId);

    message.content = content;
    message.room = room;
    message.user = user;

    return message;
  }

  async saveMessage(room: string, message: Message) {
    await this.redisService.deleteByKey(room);
    await this.messageRepository.save(message);
  }
}
