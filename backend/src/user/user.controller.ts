import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UserGuard } from '../auth/guard/auth.guard';
import { JoiValidationPipe } from '../utils/validation/JoiValidationPipe.pipe';
import { ChangePasswordDto } from './dto/change-password.dto';
import { changePasswordSchema } from './schema/change-password.schema';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { apiResponse } from '../common/interface/apiResponse';
import {
  ChangeUserAddressDto,
  ChangeUserBioDto,
  ChangeUserDateOfBirth,
  ChangeUserNameDto,
  ChangeUserPhoneDto,
  ChangeUserSexDto,
} from './dto/change-profile.dto';
import {
  changeUserAddressSchema,
  changeUserBioSchema,
  changeUserDateOfBirthSchema,
  changeUserNameSchema,
  changeUserPhoneSchema,
  changeUserSexSchema,
} from './schema/change-profile.schema';
import { MAX_AGE, TOKEN } from '../constants/cookie.constants';
import { AuthService } from '../auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../utils/multer/multerOptions';
import { ResponseMessage } from '../constants/message/responseMessage.enum';

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
   * @description PUT method for user to change name
   * @param changeUserNameDto
   * @param req
   * @returns response form with no data and error
   */
  @Put('/name')
  @UsePipes(new JoiValidationPipe(changeUserNameSchema))
  async changeName(
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

  /**
   * @description PUT method for user to update bio
   * @param changeUserBioDto
   * @param req
   * @param res
   * @returns response form with no data and error
   */
  @Put('/bio')
  @UsePipes(new JoiValidationPipe(changeUserBioSchema))
  async changeBio(
    @Body() changeUserBioDto: ChangeUserBioDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.userService.changeBio(
      changeUserBioDto,
      req.currentUser.id,
    );

    const token = this.authService.creatToken(result);

    this.authService.setCookie(res, TOKEN, token, HttpStatus.OK, MAX_AGE);

    return apiResponse.send(null, null);
  }

  /**
   * @description PUT method for user to change phone number
   * @param changeUserPhoneDto
   * @param req
   * @param res
   * @returns response form with no data and error
   */
  @Put('/phone-number')
  @UsePipes(new JoiValidationPipe(changeUserPhoneSchema))
  async changePhone(
    @Body() changeUserPhoneDto: ChangeUserPhoneDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.userService.changePhone(
      changeUserPhoneDto,
      req.currentUser.id,
      req.currentUser.phone,
    );

    const token = this.authService.creatToken(result);

    this.authService.setCookie(res, TOKEN, token, HttpStatus.OK, MAX_AGE);

    return apiResponse.send(null, null);
  }

  /**
   * @description PUT method for user to change address
   * @param changeUserAddressDto
   * @param req
   * @param res
   * @returns response form with no data and error
   */
  @Put('/address')
  @UsePipes(new JoiValidationPipe(changeUserAddressSchema))
  async changeAddress(
    @Body() changeUserAddressDto: ChangeUserAddressDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.userService.changeAddress(
      changeUserAddressDto,
      req.currentUser.id,
    );

    const token = this.authService.creatToken(result);

    this.authService.setCookie(res, TOKEN, token, HttpStatus.OK, MAX_AGE);

    return apiResponse.send(null, null);
  }

  /**
   * @description PUT method for user to update sex
   * @param changeUserSexDto
   * @param req
   * @param res
   * @returns response form with no data and error
   */
  @Put('/sex')
  @UsePipes(new JoiValidationPipe(changeUserSexSchema))
  async changeSex(
    @Body() changeUserSexDto: ChangeUserSexDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.userService.changeSex(
      changeUserSexDto,
      req.currentUser.id,
    );

    const token = this.authService.creatToken(result);

    this.authService.setCookie(res, TOKEN, token, HttpStatus.OK, MAX_AGE);

    return apiResponse.send(null, null);
  }

  /**
   * @description PUT method for user to change avatar
   * @param file
   * @param req
   * @param res
   * @returns response form with no data and error
   */
  @Put('/avatar')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async changeAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!file) {
      throw new BadRequestException(
        apiResponse.send(null, {
          image: ResponseMessage.IMG_ERROR,
        }),
      );
    }

    const result = await this.userService.changeAvatar(
      file,
      req.currentUser.id,
    );

    const token = this.authService.creatToken(result);

    this.authService.setCookie(res, TOKEN, token, HttpStatus.OK, MAX_AGE);

    return apiResponse.send(null, null);
  }

  /**
   * @description PUT method for user to change date of birth
   * @param changeUserDateOfBirth
   * @param req
   * @param res
   * @returns response form with no data and error
   */
  @Put('/date-of-birth')
  @UsePipes(new JoiValidationPipe(changeUserDateOfBirthSchema))
  async changeDateOfBirth(
    @Body() changeUserDateOfBirth: ChangeUserDateOfBirth,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.userService.changeDateOfBirth(
      changeUserDateOfBirth,
      req.currentUser.id,
    );

    const token = this.authService.creatToken(result);

    this.authService.setCookie(res, TOKEN, token, HttpStatus.OK, MAX_AGE);

    return apiResponse.send(null, null);
  }
}
