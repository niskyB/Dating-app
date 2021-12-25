import { RepositoryService } from '../../utils/repository/repository.service';
import { EntityRepository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends RepositoryService<User> {
  /**
   * @description find user info with highlight imgs, show options, find options and hobbies by field
   * @param field key of User
   * @param value any
   * @returns Promise<User>
   */
  public async findUserWithFullInfoByField(
    field: keyof User,
    value: any,
  ): Promise<User> {
    return await this.createQueryBuilder('user')
      .where(`user.${field} = :value`, { value })
      .leftJoinAndSelect('user.highlightImgs', 'userId')
      .leftJoinAndSelect('user.showOptions', 'showOptionsId')
      .leftJoinAndSelect('user.findOptions', 'findOptionsId')
      .leftJoinAndSelect('user.hobbies', 'hobbies')
      .getOne();
  }

  /**
   * @description find user info with like and dislike list
   * @param field key of User
   * @param value any
   * @returns Promise<User>
   */
  public async findUserMatchInfoByField(
    field: keyof User,
    value: any,
  ): Promise<User> {
    return await this.createQueryBuilder('user')
      .where(`user.${field} = :value`, { value })
      .leftJoinAndSelect('user.like', 'like')
      .leftJoinAndSelect('user.disLike', 'disLike')
      .leftJoinAndSelect('user.matchList', 'matchList')
      .getOne();
  }

  /**
   * @description find match list (all users except user in like, dislike and current user)
   * @param field key of User
   * @param value any
   * @returns Promise<User[]>
   */
  public async findMatchList(field: keyof User, value: any): Promise<User[]> {
    const userMatchInfo = await this.findUserMatchInfoByField(field, value);
    const list = [];
    list.push(userMatchInfo.id);

    userMatchInfo.like.forEach((element) => {
      list.push(element.id);
    });

    userMatchInfo.disLike.forEach((element) => {
      list.push(element.id);
    });

    return await this.createQueryBuilder('user')
      .where(`user.id NOT IN (:...ids)`, {
        ids: list,
      })
      .leftJoinAndSelect('user.highlightImgs', 'userId')
      .leftJoinAndSelect('user.showOptions', 'showOptionsId')
      .leftJoinAndSelect('user.hobbies', 'hobbies')
      .getMany();
  }
}
