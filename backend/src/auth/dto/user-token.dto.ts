import { Expose } from 'class-transformer';

export class UserToken {
  @Expose()
  id: string;
}
