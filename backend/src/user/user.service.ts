import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//---- entity
import { User } from './entities/user.entity';
import { UserHighLightImg } from './entities/userHighlightImg.entity';
import { UserShowOption } from './entities/userShowOption.entity';
import { UserFindOption } from './entities/userFindOption.entity';
import { Hobby } from './entities/userHobbies.entity';

//---- dto
import { CreateUserDto } from '../auth/dto/create-user.dto';
import {
  ChangeFindOptionDto,
  ChangeHobbiesDto,
  ChangeShowAgeOptionDto,
  ChangeShowBioOptionDto,
  ChangeShowHobbiesOptionDto,
  ChangeShowStudyAtOptionDto,
  ChangeStudyAtDto,
  ChangeUserAddressDto,
  ChangeUserBioDto,
  ChangeUserDateOfBirthDto,
  ChangeUserNameDto,
  ChangeUserPhoneDto,
  ChangeUserSexDto,
} from './dto/change-profile.dto';

//---- constants
import { ResponseMessage } from '../constants/message/responseMessage.enum';
import { SALT } from '../constants/bcrypt.constants';
import { Sex } from './enum/user.sex.enum';

//---- repository
import { UserRepository } from './repository/user.repository';

//---- api response
import { apiResponse } from '../common/response/apiResponse';
import { UserWithBasicInfo } from './dto/userWithBasicInfo.dto';

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
   * @param field key of user
   * @param value any
   * @returns Promise<User>
   */
  async findOneByField(field: keyof User, value: any): Promise<User> {
    return await this.userRepository.findOneByField(field, value);
  }

  //find user with only basic infor
  async findUserWithBasicInfo(
    field: keyof User,
    value: any,
  ): Promise<UserWithBasicInfo> {
    const user = await this.userRepository.findUserMatchInfoByField(
      field,
      value,
    );
    return plainToClass(UserWithBasicInfo, user, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * @description find full infomation of user
   * @param field key of user
   * @param value any
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
   * @description check and update name of user
   * @param changeUserNameDto
   * @param id id of user
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
          name: ResponseMessage.DUPLICATED_NAME,
        }),
      );
    }

    user.name = changeUserNameDto.name;

    return await this.userRepository.save(user);
  }

  /**
   * @description update bio of user to database
   * @param changeUserBioDto
   * @param id id of user
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
   * @param id id of user
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
          phone: ResponseMessage.DUPLICATED_PHONE,
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
          phone: ResponseMessage.EXISTED_PHONE,
        }),
      );
    }

    user.phone = changeUserPhoneDto.phone;

    return await this.userRepository.save(user);
  }

  /**
   * @description update user address to database
   * @param changeUserAddressDto
   * @param id id of user
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
   * @param id id of user
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
   * @param file multer file
   * @param id id of user
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
   * @param id id of user
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
   * @param files array of multer files
   * @param id id of user
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
   * @param id id of user
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
   * @param id id of user
   * @returns Promise<Hobby>
   */
  async changeHobby(
    changeHobbiesDto: ChangeHobbiesDto,
    id: string,
  ): Promise<Hobby> {
    const user = await this.userRepository.findUserWithFullInfoByField(
      'id',
      id,
    );

    if (user.hobbies.length >= 5) {
      throw new BadRequestException(
        apiResponse.send(null, {
          hobbies: ResponseMessage.REACH_LIMIT_HOBBIES,
        }),
      );
    }

    const newHobby = changeHobbiesDto.hobbies.toLowerCase();
    user.hobbies.forEach((hobby) => {
      if (hobby.hobbies === newHobby) {
        throw new BadRequestException(
          apiResponse.send(null, {
            hobbies: ResponseMessage.DUPLICATED_HOBBIES,
          }),
        );
      }
    });

    const hobby = this.hobbyRepository.create();
    hobby.hobbies = newHobby;
    hobby.user = user;
    return await this.hobbyRepository.manager.save(hobby);
  }

  /**
   * @description change show age option of user
   * @param changeShowAgeOptionDto
   * @param id id of user
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
   * @param id id of user
   */
  async changeShowStudyAt(
    changeShowStudyAtOptionDto: ChangeShowStudyAtOptionDto,
    id: string,
  ) {
    const user = await this.userRepository.findUserWithFullInfoByField(
      'id',
      id,
    );
    user.showOptions.showStudyAt = changeShowStudyAtOptionDto.showStudyAt;
    await this.userRepository.save(user);
  }

  /**
   * @description change show bio option of user
   * @param changeShowBioOptionDto
   * @param id id of user
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
   * @param id id of user
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
   * @param id id of user
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
   * @param userId id of user
   * @param hobbyId id of hobby
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
   * @param userId id of user
   * @param imgId id of img
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
