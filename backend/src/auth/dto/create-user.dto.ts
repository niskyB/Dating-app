import { PickType } from '@nestjs/mapped-types';
import { User } from '../../user/entities/user.entity';

export class CreateUserDto extends PickType(User, [
  'email',
  'password',
  'name',
  'phone',
  'address',
] as const) {
  confirmPassword: string;
}
