import { RepositoryService } from '../../utils/repository/repository.service';
import { EntityRepository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends RepositoryService<User> {}
