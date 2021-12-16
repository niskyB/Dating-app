import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class ChangePasswordDto extends PickType(User, ['password'] as const) {
  newPassword: string;
  confirmPassword: string;
}
