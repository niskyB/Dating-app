import { PickType } from '@nestjs/mapped-types';
import { User } from '../../user/entities/user.entity';

export class MatchCardDto extends PickType(User, [
  'id',
  'name',
  'avatar',
  'bio',
  'dateOfBirth',
  'highlightImgs',
  'hobbies',
  'sex',
  'showOptions',
  'studyAt',
] as const) {}
