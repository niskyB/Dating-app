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
    const result = await this.redisService.getValueByKey(notiId);
    let noti: number;
    if (result) {
      noti = +result;
    }

    if (isNaN(noti)) {
      const user = await this.userRepository.findOneByField('id', userId);
      noti = user.matchNotification;
      if (isNaN(noti)) return null;
      await this.setNoti(userId, noti);
    }
    return noti;
  }

  async resetNoti(userId: string) {
    const notiId = `notifications-${userId}`;
    await this.redisService.deleteByKey(notiId);
    const user = await this.userRepository.findOneByField('id', userId);

    user.matchNotification = 0;
    await this.userRepository.save(user);
  }
}
