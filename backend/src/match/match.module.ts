import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repository/user.repository';
import { AuthModule } from '../auth/auth.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { RedisModule } from '../utils/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    AuthModule,
    NotificationsModule,
    RedisModule,
  ],
  providers: [MatchService],
  controllers: [MatchController],
})
export class MatchModule {}
