import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

// rounds of hashing
const SALT = 10;

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async create(createUserDto: CreateUserDto) {
    // check email
    let user = await this.userService.findOneByField(
      'email',
      createUserDto.email,
    );
    if (user) {
      throw new BadRequestException({ email: 'Email has already existed' });
    }

    // check phone
    user = await this.userService.findOneByField('phone', createUserDto.phone);
    if (user) {
      throw new BadRequestException({ phone: 'Phone has already existed' });
    }

    // hash password
    createUserDto.password = await bcrypt.hash(createUserDto.password, SALT);

    // save to db
    await this.userService.createNewUser(createUserDto);
    return 'Signup successful';
  }
}
