import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from './entities/user.entity';
import { plainToClass } from 'class-transformer';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOneByField(field: keyof User, value: any): Promise<User> {
    return await this.userRepository.findOneByField(field, value);
  }

  async createNewUser(createUserDto: CreateUserDto): Promise<User> {
    const user = plainToClass(User, createUserDto);
    return await this.userRepository.manager.save(user);
  }
}
