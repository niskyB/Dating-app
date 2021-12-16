import {
  Body,
  Controller,
  HttpStatus,
  Put,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserGuard } from '../auth/guard/auth.guard';
import { JoiValidationPipe } from '../utils/validation/JoiValidationPipe.pipe';
import { ChangePasswordDto } from './dto/change-password.dto';
import { changePasswordSchema } from './schema/change-password.schema';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { apiResponse } from '../common/interface/apiResponse';
import { ChangeUserNameDto } from './dto/change-profile.dto';
import { changeUserNameSchema } from './schema/change-profile.schema';
import { MAX_AGE, TOKEN } from '../constants/cookie.constants';
import { AuthService } from '../auth/auth.service';

@Controller('users')
@UseGuards(UserGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  /**
   * @description PUT method for user to change password
   * @param changePasswordDto
   * @returns response form with no data and error
   */
  @Put('/password')
  @UsePipes(new JoiValidationPipe(changePasswordSchema))
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: Request,
  ) {
    await this.userService.changePassword(
      changePasswordDto,
      req.currentUser.id,
    );

    return apiResponse.send(null, null);
  }

  /**
   * @description
   * @param changeUserNameDto
   * @param req
   * @returns
   */
  @Put('/name')
  @UsePipes(new JoiValidationPipe(changeUserNameSchema))
  async changeProfile(
    @Body() changeUserNameDto: ChangeUserNameDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.userService.changeName(
      changeUserNameDto,
      req.currentUser.id,
      req.currentUser.name,
    );

    const token = this.authService.creatToken(result);

    this.authService.setCookie(res, TOKEN, token, HttpStatus.OK, MAX_AGE);

    return apiResponse.send(null, null);
  }
}
