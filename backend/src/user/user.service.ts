import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from './entities/user.entity';
import { plainToClass } from 'class-transformer';
import { UserRepository } from './entities/user.repository';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';
import { apiResponse } from '../utils/interface/apiResponse';
import { ResponseMessage } from '../utils/message/responseMessage.enum';

// rounds of hashing
const SALT = 10;

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  /**
   * @description find user by field
   * @param field
   * @param value
   * @returns Promise<User>
   */
  async findOneByField(field: keyof User, value: any): Promise<User> {
    return await this.userRepository.findOneByField(field, value);
  }

  /**
   * @description save user to database
   * @param createUserDto
   * @returns Promise<User>
   */
  async createNewUser(createUserDto: CreateUserDto): Promise<User> {
    const user = plainToClass(User, createUserDto);
    return await this.userRepository.manager.save(user);
  }

  /**
   * @description
   * @param changePasswordDto
   * @returns
   */
  async changePassword(changePasswordDto: ChangePasswordDto, id: string) {
    const user = await this.findOneByField('id', id);

    if (!(await bcrypt.compare(changePasswordDto.password, user.password))) {
      throw new BadRequestException(
        apiResponse.send(null, {
          common: ResponseMessage.INVALID_PASSWORD,
        }),
      );
    }

    if (changePasswordDto.password === changePasswordDto.newPassword) {
      throw new BadRequestException(
        apiResponse.send(null, {
          common: ResponseMessage.DUPLICATED_PASSWORD,
        }),
      );
    }

    user.password = await bcrypt.hash(changePasswordDto.newPassword, SALT);

    await this.userRepository.save(user);
  }
}
