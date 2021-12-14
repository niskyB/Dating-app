import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SigninUserDto } from './dto/signin-user.dto';
import { User } from '../user/entities/user.entity';
import { UserToken } from './dto/user-token.dto';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';

// rounds of hashing
const SALT = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @description create a user with valid field and save to database
   * @param createUserDto
   * @returns
   */
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

  /**
   * @description validate user signin fields
   * @param signinUserDto
   * @returns
   */
  async signin(signinUserDto: SigninUserDto) {
    // check existed user
    const user = await this.userService.findOneByField(
      'email',
      signinUserDto.email,
    );
    if (!user) {
      throw new BadRequestException('email or password is not correct');
    }

    // check password
    if (!(await bcrypt.compare(signinUserDto.password, user.password))) {
      throw new BadRequestException('email or password is not correct');
    }

    return user;
  }

  /**
   * @description generate jwt token with user's info
   * @param user
   * @returns jwt token
   */
  creatToken(user: User) {
    const payload = {
      ...plainToClass(UserToken, user, {
        excludeExtraneousValues: true,
      }),
    };
    return this.jwtService.sign(payload);
  }
}
