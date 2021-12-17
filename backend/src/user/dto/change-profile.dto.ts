import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class ChangeUserNameDto extends PickType(User, ['name'] as const) {}

export class ChangeUserBioDto extends PickType(User, ['bio'] as const) {}

export class ChangeUserPhoneDto extends PickType(User, ['phone'] as const) {}

export class ChangeUserAddressDto extends PickType(User, [
  'address',
] as const) {}

export class ChangeUserSexDto extends PickType(User, ['sex'] as const) {}
