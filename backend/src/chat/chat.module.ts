import { Module } from '@nestjs/common';
import { RedisModule } from '../utils/redis/redis.module';
import { AuthModule } from '../auth/auth.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './repository/message.repository';
import { UserRepository } from '../user/repository/user.repository';
import { ChatController } from './chat.controller';

@Module({
  imports: [
    AuthModule,
    RedisModule,
    TypeOrmModule.forFeature([MessageRepository, UserRepository]),
  ],
  providers: [ChatService, ChatGateway],
  exports: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
