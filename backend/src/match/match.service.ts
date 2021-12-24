import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/entities/user.repository';

@Injectable()
export class MatchService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * @description get match list by given id
   * @param id of the current user
   * @returns Promise<User[]>
   */
  async getUsers(id: string): Promise<User[]> {
    return await this.userRepository.findMatchList('id', id);
  }

  async match(currentUserId: string, matchId: string) {
    const user = await this.userRepository.findUserMatchInfoByField(
      'id',
      currentUserId,
    );

    const matchUser = await this.userRepository.findOneByField('id', matchId);

    user.like.push(matchUser);
    await this.userRepository.save(user);
  }
}
