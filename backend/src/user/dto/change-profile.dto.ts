import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { UserFindOption } from '../entities/userFindOption.entity';
import { Hobby } from '../entities/userHobbies.entity';
import { UserShowOption } from '../entities/userShowOption.entity';

export class ChangeUserNameDto extends PickType(User, ['name'] as const) {}

export class ChangeUserBioDto extends PickType(User, ['bio'] as const) {}

export class ChangeUserPhoneDto extends PickType(User, ['phone'] as const) {}

export class ChangeUserAddressDto extends PickType(User, [
  'address',
] as const) {}

export class ChangeUserSexDto extends PickType(User, ['sex'] as const) {}

export class ChangeUserDateOfBirthDto extends PickType(User, [
  'dateOfBirth',
] as const) {}

export class ChangeStudyAtDto extends PickType(User, ['studyAt'] as const) {}

export class ChangeHobbiesDto extends PickType(Hobby, ['hobbies'] as const) {}

export class ChangeShowAgeOptionDto extends PickType(UserShowOption, [
  'showAge',
] as const) {}

export class ChangeShowStudyAtOptionDto extends PickType(UserShowOption, [
  'showStudyAt',
] as const) {}

export class ChangeShowBioOptionDto extends PickType(UserShowOption, [
  'showBio',
] as const) {}

export class ChangeShowHobbiesOptionDto extends PickType(UserShowOption, [
  'showHobbies',
] as const) {}

export class ChangeFindOptionDto extends PickType(UserFindOption, [
  'minAge',
  'maxAge',
  'sexOption',
] as const) {}
