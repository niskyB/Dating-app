import { Expose } from 'class-transformer';
import { Sex } from '../../user/enum/user.sex.enum';

export class UserToken {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  phone: string;

  @Expose()
  address: string;

  @Expose()
  sex: Sex;

  @Expose()
  avatar: string;

  @Expose()
  bio: string;

  @Expose()
  createDate: Date;

  @Expose()
  dateOfBirth: Date;
}
