import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';

//---- dto
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';

//---- schema
import { createUserSchema } from './schema/create-user.schema';
import { signinUserSchema } from './schema/signin-user.schema';

//---- service
import { AuthService } from './auth.service';

//---- pipe
import { JoiValidationPipe } from '../utils/validation/JoiValidationPipe.pipe';

//---- api response
import { apiResponse } from '../common/response/apiResponse';

//---- constants
import { EXPIRED_AGE, MAX_AGE, TOKEN } from '../constants/cookie.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @description POST method for user to signup
   * @param createUserDto
   * @returns response form with no data and error
   */
  @Post('/signup')
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async create(@Body() createUserDto: CreateUserDto) {
    await this.authService.create(createUserDto);
    return apiResponse.send(null, null);
  }

  /**
   * @description POST method for user to signin
   * @param signinUserDto
   * @returns response form with no data and error
   */
  @Post('/signin')
  @UsePipes(new JoiValidationPipe(signinUserSchema))
  async signin(
    @Body() signinUserDto: SigninUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signin(signinUserDto);
    const token = this.authService.creatToken(result);
    this.authService.setCookie(res, TOKEN, token, HttpStatus.OK, MAX_AGE);
    return apiResponse.send(null, null);
  }

  /**
   * @description POST method to delete token in cookie
   * @param res Request
   * @returns response form with no data and error
   */
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie(TOKEN, '', { maxAge: EXPIRED_AGE }).status(HttpStatus.OK);

    return apiResponse.send(null, null);
  }
}
