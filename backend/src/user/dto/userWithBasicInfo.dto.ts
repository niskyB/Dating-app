import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class UserWithBasicInfo extends PickType(User, [
  'id',
  'name',
  'avatar',
] as const) {}
