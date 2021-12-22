import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from './entities/user.entity';
import { plainToClass } from 'class-transformer';
import { UserRepository } from './entities/user.repository';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';
import { apiResponse } from '../common/interface/apiResponse';
import { ResponseMessage } from '../constants/message/responseMessage.enum';
import { SALT } from '../constants/bcrypt.constants';
import {
  ChangeFindOptionDto,
  ChangeHobbiesDto,
  ChangeShowAgeOptionDto,
  ChangeShowBioOptionDto,
  ChangeShowHobbiesOptionDto,
  ChangeShowStudyOptionDto,
  ChangeStudyAtDto,
  ChangeUserAddressDto,
  ChangeUserBioDto,
  ChangeUserDateOfBirthDto,
  ChangeUserNameDto,
  ChangeUserPhoneDto,
  ChangeUserSexDto,
} from './dto/change-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHighLightImg } from './entities/userHighlightImg.entity';
import { Repository } from 'typeorm';
import { UserShowOption } from './entities/userShowOption.entity';
import { UserFindOption } from './entities/userFindOption.entity';
import { Sex } from './enum/user.sex.enum';
import { Hobby } from './entities/userHobbies.entity';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    @InjectRepository(UserHighLightImg)
    private userHighlightImgRepository: Repository<UserHighLightImg>,
    @InjectRepository(Hobby)
    private hobbyRepository: Repository<Hobby>,
  ) {}

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
   * @description find full infomation of user
   * @param field
   * @param value
   * @returns Promise<User>
   */
  async findCurrentUserByField(field: keyof User, value: any): Promise<User> {
    return await this.userRepository.findUserWithFullInfoByField(field, value);
  }

  /**
   * @description save user to database
   * @param createUserDto
   * @returns Promise<User>
   */
  async createNewUser(createUserDto: CreateUserDto): Promise<User> {
    const user = plainToClass(User, createUserDto);
    user.showOptions = new UserShowOption();
    user.findOptions = new UserFindOption();
    if (user.sex == Sex.MALE) {
      user.findOptions.sexOption = Sex.FEMALE;
    } else {
      user.findOptions.sexOption = Sex.MALE;
    }
    return await this.userRepository.manager.save(user);
  }

  /**
   * @description validate password and save to database if valid
   * @param changePasswordDto
   */
  async changePassword(
    changePasswordDto: ChangePasswordDto,
    id: string,
  ): Promise<User> {
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

    return await this.userRepository.save(user);
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
  ): Promise<User> {
    const user = await this.findOneByField('id', id);

    if (changeUserNameDto.name === user.name) {
      throw new BadRequestException(
        apiResponse.send(null, {
          common: ResponseMessage.DUPLICATED_NAME,
        }),
      );
    }

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

  /**
   * @description check and update phone number
   * @param changeUserPhoneDto
   * @param id
   * @param phone
   * @returns Promise<User>
   */
  async changePhone(
    changeUserPhoneDto: ChangeUserPhoneDto,
    id: string,
  ): Promise<User> {
    const user = await this.findOneByField('id', id);

    if (changeUserPhoneDto.phone === user.phone) {
      throw new BadRequestException(
        apiResponse.send(null, {
          common: ResponseMessage.DUPLICATED_PHONE,
        }),
      );
    }

    const existedUser = await this.findOneByField(
      'phone',
      changeUserPhoneDto.phone,
    );
    if (existedUser) {
      throw new BadRequestException(
        apiResponse.send(null, {
          common: ResponseMessage.EXISTED_PHONE,
        }),
      );
    }

    user.phone = changeUserPhoneDto.phone;

    return await this.userRepository.save(user);
  }

  /**
   * @description update user address to database
   * @param changeUserAddressDto
   * @param id
   * @returns Promise<User>
   */
  async changeAddress(
    changeUserAddressDto: ChangeUserAddressDto,
    id: string,
  ): Promise<User> {
    const user = await this.findOneByField('id', id);
    user.address = changeUserAddressDto.address;

    return await this.userRepository.save(user);
  }

  /**
   * @description update user sex to database
   * @param changeUserSexDto
   * @param id
   * @returns Promise<User>
   */
  async changeSex(
    changeUserSexDto: ChangeUserSexDto,
    id: string,
  ): Promise<User> {
    const user = await this.findOneByField('id', id);
    user.sex = changeUserSexDto.sex;

    return await this.userRepository.save(user);
  }

  /**
   * @description update user avatar to database
   * @param file
   * @param id
   * @returns Promise<User>
   */
  async changeAvatar(file: Express.Multer.File, id: string): Promise<User> {
    const user = await this.findOneByField('id', id);
    user.avatar = file.filename;

    return await this.userRepository.save(user);
  }

  /**
   * @description update user date of birth to database
   * @param changeUserDateOfBirth
   * @param id
   * @returns Promise<User>
   */
  async changeDateOfBirth(
    changeUserDateOfBirth: ChangeUserDateOfBirthDto,
    id: string,
  ): Promise<User> {
    const user = await this.findOneByField('id', id);
    user.dateOfBirth = changeUserDateOfBirth.dateOfBirth;

    return await this.userRepository.save(user);
  }

  /**
   * @description change highlight imgs then save to database
   * @param files
   * @param id
   * @returns Promise<User>
   */
  async changeHighlightImgs(
    files: Array<Express.Multer.File>,
    id: string,
  ): Promise<User> {
    const user = await this.userRepository.findUserWithFullInfoByField(
      'id',
      id,
    );
    files.forEach(async (file) => {
      const highlightImg = this.userHighlightImgRepository.create();
      highlightImg.image = file.filename;
      highlightImg.user = user;
      await this.userHighlightImgRepository.manager.save(highlightImg);
    });
    return user;
  }

  /**
   * @description change study at of user and save to database
   * @param changeStudyAtDto
   * @param id
   * @returns Promise<User>
   */
  async changeStudyAt(
    changeStudyAtDto: ChangeStudyAtDto,
    id: string,
  ): Promise<User> {
    const user = await this.userRepository.findOneByField('id', id);
    user.studyAt = changeStudyAtDto.studyAt;
    return await this.userRepository.save(user);
  }

  /**
   * @description change hobby of user
   * @param changeHobbiesDto
   * @param id
   * @returns Promise<Hobby>
   */
  async changeHobby(
    changeHobbiesDto: ChangeHobbiesDto,
    id: string,
  ): Promise<Hobby> {
    const user = await this.userRepository.findOneByField('id', id);
    const hobby = this.hobbyRepository.create();
    hobby.name = changeHobbiesDto.name;
    hobby.user = user;
    return await this.hobbyRepository.manager.save(hobby);
  }

  /**
   * @description change show age option of user
   * @param changeShowAgeOptionDto
   * @param id
   */
  async changeShowAge(
    changeShowAgeOptionDto: ChangeShowAgeOptionDto,
    id: string,
  ) {
    const user = await this.userRepository.findUserWithFullInfoByField(
      'id',
      id,
    );
    user.showOptions.showAge = changeShowAgeOptionDto.showAge;
    await this.userRepository.save(user);
  }

  /**
   * @description change show study option of user
   * @param changeShowStudyOptionDto
   * @param id
   */
  async changeShowStudy(
    changeShowStudyOptionDto: ChangeShowStudyOptionDto,
    id: string,
  ) {
    const user = await this.userRepository.findUserWithFullInfoByField(
      'id',
      id,
    );
    user.showOptions.showStudy = changeShowStudyOptionDto.showStudy;
    await this.userRepository.save(user);
  }

  /**
   * @description change show bio option of user
   * @param changeShowBioOptionDto
   * @param id
   */
  async changeShowBio(
    changeShowBioOptionDto: ChangeShowBioOptionDto,
    id: string,
  ) {
    const user = await this.userRepository.findUserWithFullInfoByField(
      'id',
      id,
    );
    user.showOptions.showBio = changeShowBioOptionDto.showBio;
    await this.userRepository.save(user);
  }

  /**
   * @description change show hobbies option of user
   * @param changeShowHobbiesOptionDto
   * @param id
   */
  async changeShowHobbies(
    changeShowHobbiesOptionDto: ChangeShowHobbiesOptionDto,
    id: string,
  ) {
    const user = await this.userRepository.findUserWithFullInfoByField(
      'id',
      id,
    );
    user.showOptions.showHobbies = changeShowHobbiesOptionDto.showHobbies;
    await this.userRepository.save(user);
  }

  /**
   * @description change find option of user
   * @param changeFindOptionDto
   * @param id
   */
  async changeFindOption(changeFindOptionDto: ChangeFindOptionDto, id: string) {
    const user = await this.userRepository.findUserWithFullInfoByField(
      'id',
      id,
    );
    user.findOptions.minAge = changeFindOptionDto.minAge;
    user.findOptions.maxAge = changeFindOptionDto.maxAge;
    user.findOptions.sexOption = changeFindOptionDto.sexOption;
    await this.userRepository.save(user);
  }

  /**
   * @description delete hobby with given id in database
   * @param userId
   * @param hobbyId
   */
  async removeHobby(userId: string, hobbyId: string) {
    const user = await this.userRepository.findUserWithFullInfoByField(
      'id',
      userId,
    );

    let isBelongTo = false;
    for (let i = 0; i < user.hobbies.length; i++) {
      if (user.hobbies[i].id === hobbyId) isBelongTo = true;
    }

    if (!isBelongTo) {
      throw new NotFoundException(
        apiResponse.send(null, {
          common: ResponseMessage.NOTFOUND,
        }),
      );
    }

    await this.hobbyRepository.delete({ id: hobbyId });
  }

  /**
   * @description delete highlight img with given id in database
   * @param userId
   * @param imgId
   */
  async removeUserHighlightImg(userId: string, imgId: string) {
    const user = await this.userRepository.findUserWithFullInfoByField(
      'id',
      userId,
    );

    let isBelongTo = false;
    for (let i = 0; i < user.highlightImgs.length; i++) {
      if (user.highlightImgs[i].id === imgId) isBelongTo = true;
    }

    if (!isBelongTo) {
      throw new NotFoundException(
        apiResponse.send(null, {
          common: ResponseMessage.NOTFOUND,
        }),
      );
    }

    await this.userHighlightImgRepository.delete({ id: imgId });
  }
}
