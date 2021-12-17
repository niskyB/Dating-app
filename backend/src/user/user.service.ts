import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from './entities/user.entity';
import { plainToClass } from 'class-transformer';
import { UserRepository } from './entities/user.repository';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';
import { apiResponse } from '../common/interface/apiResponse';
import { ResponseMessage } from '../constants/message/responseMessage.enum';
import { SALT } from '../constants/bcrypt.constants';
import { ChangeUserBioDto, ChangeUserNameDto } from './dto/change-profile.dto';

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
   * @description validate password and save to database if valid
   * @param changePasswordDto
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

  /**
   * @description check and update name of user
   * @param changeUserNameDto
   * @param id
   * @param name
   * @returns Promise<User>
   */
  async changeName(
    changeUserNameDto: ChangeUserNameDto,
    id: string,
    name: string,
  ): Promise<User> {
    if (changeUserNameDto.name === name) {
      throw new BadRequestException(
        apiResponse.send(null, {
          common: ResponseMessage.DUPLICATED_NAME,
        }),
      );
    }

    const user = await this.findOneByField('id', id);
    user.name = changeUserNameDto.name;

    return await this.userRepository.save(user);
  }

  /**
   * @description update bio of user to database
   * @param changeUserBioDto
   * @param id
   * @returns Promise<User>
   */
  async changeBio(
    changeUserBioDto: ChangeUserBioDto,
    id: string,
  ): Promise<User> {
    const user = await this.findOneByField('id', id);
    user.bio = changeUserBioDto.bio;

    return await this.userRepository.save(user);
  }
}
