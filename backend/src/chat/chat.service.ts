import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MatchCardDto } from '../match/dto/match-card.dto';
import { UserRepository } from '../user/repository/user.repository';
import { RedisService } from '../utils/redis/redis.service';
import { MessageDto } from './dto/message.dto';
import { MessageListDto } from './dto/messageList.dto';
import { Message } from './entities/message.entity';
import { MessageRepository } from './repository/message.repository';

@Injectable()
export class ChatService {
  constructor(
    private readonly redisService: RedisService,
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async setChat(room: string, messages: MessageListDto) {
    return await this.redisService.setObjectByKey(room, messages, 120);
  }

  async getChat(
    room: string,
    page: number,
    limit: number,
  ): Promise<MessageDto[]> {
    let result = await this.redisService.getObjectByKey<MessageListDto>(room);
    let currentPage = 0;

    if (result) {
      currentPage = result.messages.length / limit - 1;
    }

    // if no data in redis or current page less than required page
    if (!result || (result && currentPage < page)) {
      const messages = await this.messageRepository.findMessagesByRoom(
        room,
        page * limit,
        limit,
      );

      // if no data in redis and no data in database
      if (!result && !messages.length) return [];

      // if no data in redis but exist data in database
      if (!result) result = { messages };
      // if exist data both in redis and database
      else if (result && messages.length)
        result.messages = result.messages.concat(messages);
      await this.setChat(room, result);
    }

    let messageList = [];
    for (let i = 0; i < result.messages.length; i++) {
      const sender = plainToClass(MatchCardDto, result.messages[i].user, {
        excludeExtraneousValues: true,
      });
      const message = { ...result.messages[i], sender };
      messageList.push(
        plainToClass(MessageDto, message, { excludeExtraneousValues: true }),
      );
    }

    return messageList;
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
    await this.redisService.deleteByKey('lastMessage-' + room);
    await this.messageRepository.save(message);
  }

  async getLastMessage(room: string): Promise<Message> {
    let result = await this.redisService.getObjectByKey<Message>(
      'lastMessage-' + room,
    );
    if (!result) {
      const messages = await this.messageRepository.findMessagesByRoom(
        room,
        0,
        1,
      );
      result = messages[0];
    }

    return result;
  }

  async getChatList(id: string) {
    const roomList = await this.messageRepository.findRoomListById(id);
    const chatList = [];

    for (let i = 0; i < roomList.length; i++) {
      const partnerId = roomList[i].room.replace(id, '').replace('@', '');

      const result = await this.userRepository.findOneByField('id', partnerId);
      const partner = plainToClass(MatchCardDto, result, {
        excludeExtraneousValues: true,
      });

      const message = await this.messageRepository.findLastMessage(
        roomList[i].room,
      );
      const sender = plainToClass(MatchCardDto, message.user, {
        excludeExtraneousValues: true,
      });

      const messageDto = { ...message, partner, sender };
      chatList.push(
        plainToClass(MessageDto, messageDto, { excludeExtraneousValues: true }),
      );
    }
    return chatList;
  }
}
