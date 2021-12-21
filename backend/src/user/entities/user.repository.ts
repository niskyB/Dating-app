import { RepositoryService } from '../../utils/repository/repository.service';
import { EntityRepository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends RepositoryService<User> {
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
}
