import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repository/user.repository';
import { AuthModule } from '../auth/auth.module';
import { RedisModule } from '../utils/redis/redis.module';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    AuthModule,
    RedisModule,
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [NotificationsService, NotificationsGateway],
  exports: [NotificationsGateway, NotificationsService],
})
export class NotificationsModule {}
