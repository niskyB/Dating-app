import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class ChangeUserNameDto extends PickType(User, ['name'] as const) {}

export class ChangeUserBioDto extends PickType(User, ['bio'] as const) {}
