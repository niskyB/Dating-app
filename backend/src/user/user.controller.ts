import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UserGuard } from '../auth/guard/auth.guard';
import { JoiValidationPipe } from '../utils/validation/JoiValidationPipe.pipe';
import { ChangePasswordDto } from './dto/change-password.dto';
import { changePasswordSchema } from './schema/change-password.schema';
import { UserService } from './user.service';
import { Request } from 'express';
import { apiResponse } from '../common/interface/apiResponse';
import {
  ChangeHobbiesDto,
  ChangeShowAgeOptionDto,
  ChangeShowStudyOptionDto,
  ChangeStudyAtDto,
  ChangeUserAddressDto,
  ChangeUserBioDto,
  ChangeUserDateOfBirthDto,
  ChangeUserNameDto,
  ChangeUserPhoneDto,
  ChangeUserSexDto,
} from './dto/change-profile.dto';
import {
  changeHobbySchema,
  changeShowAgeOptionSchema,
  changeShowStudyOptionSchema,
  changeStudyAtSchema,
  changeUserAddressSchema,
  changeUserBioSchema,
  changeUserDateOfBirthSchema,
  changeUserNameSchema,
  changeUserPhoneSchema,
  changeUserSexSchema,
} from './schema/change-profile.schema';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../utils/multer/multerOptions';
import { ResponseMessage } from '../constants/message/responseMessage.enum';
import { MAX_COUNT } from '../constants/multer.constants';
import { serialize } from '../utils/interceptor/serialize.interceptor';
import { User } from './entities/user.entity';

@Controller('users')
@UseGuards(UserGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @description GET method to get current user
   * @param req
   * @returns response form with user data
   */
  @Get()
  @serialize(User)
  async getCurrentUser(@Req() req: Request) {
    const result = await this.userService.findCurrentUserByField(
      'id',
      req.currentUser.id,
    );

    return result;
  }

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
  ) {
    await this.userService.changeName(changeUserNameDto, req.currentUser.id);

    return apiResponse.send(null, null);
  }

  /**
   * @description PUT method for user to update bio
   * @param changeUserBioDto
   * @param req
   * @returns response form with no data and error
   */
  @Put('/bio')
  @UsePipes(new JoiValidationPipe(changeUserBioSchema))
  async changeBio(
    @Body() changeUserBioDto: ChangeUserBioDto,
    @Req() req: Request,
  ) {
    await this.userService.changeBio(changeUserBioDto, req.currentUser.id);

    return apiResponse.send(null, null);
  }

  /**
   * @description PUT method for user to change phone number
   * @param changeUserPhoneDto
   * @param req
   * @returns response form with no data and error
   */
  @Put('/phone')
  @UsePipes(new JoiValidationPipe(changeUserPhoneSchema))
  async changePhone(
    @Body() changeUserPhoneDto: ChangeUserPhoneDto,
    @Req() req: Request,
  ) {
    await this.userService.changePhone(changeUserPhoneDto, req.currentUser.id);

    return apiResponse.send(null, null);
  }

  /**
   * @description PUT method for user to change address
   * @param changeUserAddressDto
   * @param req
   * @returns response form with no data and error
   */
  @Put('/address')
  @UsePipes(new JoiValidationPipe(changeUserAddressSchema))
  async changeAddress(
    @Body() changeUserAddressDto: ChangeUserAddressDto,
    @Req() req: Request,
  ) {
    await this.userService.changeAddress(
      changeUserAddressDto,
      req.currentUser.id,
    );

    return apiResponse.send(null, null);
  }

  /**
   * @description PUT method for user to update sex
   * @param changeUserSexDto
   * @param req
   * @returns response form with no data and error
   */
  @Put('/sex')
  @UsePipes(new JoiValidationPipe(changeUserSexSchema))
  async changeSex(
    @Body() changeUserSexDto: ChangeUserSexDto,
    @Req() req: Request,
  ) {
    await this.userService.changeSex(changeUserSexDto, req.currentUser.id);

    return apiResponse.send(null, null);
  }

  /**
   * @description PUT method for user to change avatar
   * @param file
   * @param req
   * @returns response form with no data and error
   */
  @Put('/avatar')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async changeAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!file) {
      throw new BadRequestException(
        apiResponse.send(null, {
          image: ResponseMessage.IMG_ERROR,
        }),
      );
    }

    await this.userService.changeAvatar(file, req.currentUser.id);

    return apiResponse.send(null, null);
  }

  /**
   * @description PUT method for user to change date of birth
   * @param changeUserDateOfBirth
   * @param req
   * @returns response form with no data and error
   */
  @Put('/dateOfBirth')
  @UsePipes(new JoiValidationPipe(changeUserDateOfBirthSchema))
  async changeDateOfBirth(
    @Body() changeUserDateOfBirthDto: ChangeUserDateOfBirthDto,
    @Req() req: Request,
  ) {
    await this.userService.changeDateOfBirth(
      changeUserDateOfBirthDto,
      req.currentUser.id,
    );

    return apiResponse.send(null, null);
  }

  /**
   * @description PUT method for user to update highlight images
   * @param files
   * @param req
   * @returns response form with no data and error
   */
  @Put('/highlightImgs')
  @UseInterceptors(FilesInterceptor('images', MAX_COUNT, multerOptions))
  async changeUserHighlightImgs(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: Request,
  ) {
    if (!files) {
      throw new BadRequestException(
        apiResponse.send(null, {
          image: ResponseMessage.IMG_ERROR,
        }),
      );
    }

    await this.userService.changeHighlightImgs(files, req.currentUser.id);

    return apiResponse.send(null, null);
  }

  /**
   * @description PUT method for user to change study at
   * @param changeStudyAtDto
   * @param req
   * @returns response form with no data and error
   */
  @Put('/studyAt')
  @UsePipes(new JoiValidationPipe(changeStudyAtSchema))
  async changeStudyAt(
    @Body() changeStudyAtDto: ChangeStudyAtDto,
    @Req() req: Request,
  ) {
    await this.userService.changeStudyAt(changeStudyAtDto, req.currentUser.id);
    return apiResponse.send(null, null);
  }

  /**
   * @description PUT method for user to change hobbies
   * @param changeHobbiesDto
   * @param req
   * @returns response form with no data and error
   */
  @Put('/hobbies')
  @UsePipes(new JoiValidationPipe(changeHobbySchema))
  async changeHobby(
    @Body() changeHobbiesDto: ChangeHobbiesDto,
    @Req() req: Request,
  ) {
    await this.userService.changeHobby(changeHobbiesDto, req.currentUser.id);
    return apiResponse.send(null, null);
  }

  /**
   * @description PUT method for user to change show age option
   * @param changeShowAgeOptionDto
   * @param req
   * @returns response form with no data and error
   */
  @Put('/showOption/showAge')
  @UsePipes(new JoiValidationPipe(changeShowAgeOptionSchema))
  async changeShowAge(
    @Body() changeShowAgeOptionDto: ChangeShowAgeOptionDto,
    @Req() req: Request,
  ) {
    await this.userService.changeShowAge(
      changeShowAgeOptionDto,
      req.currentUser.id,
    );
    return apiResponse.send(null, null);
  }

  /**
   * @description PUT method for user to change show study option
   * @param changeShowStudyOptionDto
   * @param req
   * @returns response form with no data and error
   */
  @Put('/showOption/showStudy')
  @UsePipes(new JoiValidationPipe(changeShowStudyOptionSchema))
  async changeShowStudy(
    @Body() changeShowStudyOptionDto: ChangeShowStudyOptionDto,
    @Req() req: Request,
  ) {
    await this.userService.changeShowStudy(
      changeShowStudyOptionDto,
      req.currentUser.id,
    );
    return apiResponse.send(null, null);
  }

  /**
   * @description DELETE method for user to remove hobby
   * @param id
   * @param req
   * @returns response form with no data and error
   */
  @Delete('/hobbies/:id')
  async removeHobby(@Param('id') id: string, @Req() req: Request) {
    await this.userService.removeHobby(req.currentUser.id, id);
    return apiResponse.send(null, null);
  }

  /**
   * @description DELETE method for user to remove highlight image
   * @param id
   * @param req
   * @returns response form with no data and error
   */
  @Delete('/highlightImgs/:id')
  async removeUserHighlightImg(@Param('id') id: string, @Req() req: Request) {
    await this.userService.removeUserHighlightImg(req.currentUser.id, id);
    return apiResponse.send(null, null);
  }
}
