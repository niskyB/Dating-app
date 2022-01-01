import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { RedisService } from '../utils/redis/redis.service';
import { NotificationAction } from '../notifications/notifications.actions';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { UserRepository } from '../user/repository/user.repository';
import { MatchCardDto } from './dto/match-card.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MatchService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly notificationsGateway: NotificationsGateway,
    private readonly redisService: RedisService,
  ) {}

  /**
   * @description get match list by given id
   * @param id of the current user
   * @returns Promise<MatchCardDto[]>
   */
  async getUsers(id: string, limit: number): Promise<MatchCardDto[]> {
    const results = await this.userRepository.findUserForMatching(
      'id',
      id,
      limit,
    );

    await this.sendToDislikeList(id, results);

    return results.map((user) =>
      plainToClass(MatchCardDto, user, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async sendToDislikeList(id: string, users: User[]) {
    const user = await this.userRepository.findUserMatchInfoByField('id', id);
    users.forEach((element) => {
      user.disLike.push(element);
    });
    await this.userRepository.save(user);
  }

  //get view again list
  async resetDislikeList(currentUserId: string) {
    const userMatchInfo = await this.userRepository.findUserMatchInfoByField(
      'id',
      currentUserId,
    );
    userMatchInfo.disLike = [];
    await this.userRepository.save(userMatchInfo);
    return true;
  }

  /**
   * @description add matched user to like list and match list (if they match each orders)
   * @param currentUserId id of current user
   * @param matchId id of matched user
   */
  async match(currentUserId: string, matchId: string) {
    // this variable is for checking that matchUser is like the current user or not
    let isMatched = false;

    const user = await this.userRepository.findUserMatchInfoByField(
      'id',
      currentUserId,
    );

    const matchUser = await this.userRepository.findUserMatchInfoByField(
      'id',
      matchId,
    );
    //push new like user to the list
    user.like.push(matchUser);

    //check matchUser like current user or not, if matched, return true for isMatch
    matchUser.like.forEach((element) => {
      if (element.id === currentUserId) {
        isMatched = true;
      }
    });

    if (isMatched) {
      user.matchList.push(matchUser);
      matchUser.matchList.push(user);
      //++ noti of both user
      user.matchNotification++;
      matchUser.matchNotification++;
      //save to db before emit to client
      await this.userRepository.save(matchUser);
      await this.userRepository.save(user);
      //emit to client
      const userNotiId = 'notifications-' + user.id;
      const matchUserNotiId = 'notifications-' + matchUser.id;

      this.notificationsGateway.emitNotiToRoom(
        NotificationAction.NOTIFICATIONS_GET,
        userNotiId,
        { newMatch: user.matchNotification },
      );

      this.notificationsGateway.emitNotiToRoom(
        NotificationAction.NOTIFICATIONS_GET,
        matchUserNotiId,
        { newMatch: matchUser.matchNotification },
      );

      this.redisService.setValueByKey(userNotiId, user.matchNotification);
      this.redisService.setValueByKey(
        matchUserNotiId,
        matchUser.matchNotification,
      );
      return;
    }

    await this.userRepository.save(user);
  }

  //on user dislike someone
  async dislike(currentUserId: string, targetId: string) {
    const currentUser = await this.userRepository.findUserMatchInfoByField(
      'id',
      currentUserId,
    );
    const dislikeUser = await this.userRepository.findUserMatchInfoByField(
      'id',
      targetId,
    );
    currentUser.disLike.push(dislikeUser);
    return await this.userRepository.save(currentUser);
  }

  /**
   * @description get user's match list
   * @param id id of user
   * @returns Promise<MatchCardDto[]>
   */
  async getMatchList(id: string): Promise<MatchCardDto[]> {
    const user = await this.userRepository.findMatchList('id', id);
    return user.matchList.map((user) =>
      plainToClass(MatchCardDto, user, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
