import { RepositoryService } from '../../utils/repository/repository.service';
import { EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';

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
      .leftJoinAndSelect('user.findOptions', 'findOptions')
      .getOne();
  }

  /**
   * @description find user for matching (all users except user in like, dislike and current user)
   * @param field key of User
   * @param value any
   * @returns Promise<User[]>
   */
  public async findUserForMatching(
    field: keyof User,
    value: any,
    limit: number,
    skip: number,
  ): Promise<User[]> {
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
      .andWhere(`user.sex = :sex`, { sex: userMatchInfo.findOptions.sexOption })
      .andWhere(
        `year(now()) - year(user.dateOfBirth) between :minAge and :maxAge`,
        {
          minAge: userMatchInfo.findOptions.minAge,
          maxAge: userMatchInfo.findOptions.maxAge,
        },
      )
      .leftJoinAndSelect('user.highlightImgs', 'userId')
      .leftJoinAndSelect('user.showOptions', 'showOptionsId')
      .leftJoinAndSelect('user.hobbies', 'hobbies')
      .skip(skip)
      .take(limit)
      .getMany();
  }

  /**
   * @description find match list of user
   * @param field
   * @param value
   * @returns Promise<User>
   */
  async findMatchList(field: keyof User, value: any): Promise<User> {
    return await this.createQueryBuilder('user')
      .where(`user.${field} = :value`, { value })
      .leftJoinAndSelect('user.matchList', 'matchList')
      .getOne();
  }
}
