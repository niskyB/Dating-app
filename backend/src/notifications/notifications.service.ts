import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import { RedisService } from '../utils/redis/redis.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly redisService: RedisService,
    private readonly userRepository: UserRepository,
  ) {}

  async setNoti(userId: string, noti: number) {
    const notiId = `notifications-${userId}`;
    return await this.redisService.setValueByKey(notiId, noti, 120);
  }

  async getNoti(userId: string) {
    const notiId = `notifications-${userId}`;
    let noti: number = +(await this.redisService.getValueByKey(notiId));

    if (isNaN(noti)) {
      const user = await this.userRepository.findOneByField('id', userId);
      noti = user.matchNotification;
      if (!noti) return null;
      await this.setNoti(userId, noti);
    }
    return noti;
  }
}
