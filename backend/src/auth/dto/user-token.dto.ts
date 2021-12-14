import { PickType } from '@nestjs/mapped-types';
import { User } from '../../user/entities/user.entity';

export class UserToken extends PickType(User, [
  'id',
  'email',
  'name',
  'phone',
  'address',
  'avatar',
  'bio',
] as const) {}
