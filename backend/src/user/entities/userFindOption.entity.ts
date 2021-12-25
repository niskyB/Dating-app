import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { sexEnumString } from '../enum/user.sex.enum';
import { User } from './user.entity';

@Entity()
export class UserFindOption {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ default: 18 })
  @Expose()
  minAge: number;

  @Column({ default: 22 })
  @Expose()
  maxAge: number;

  @Column({ nullable: false })
  @Expose()
  sexOption: sexEnumString;

  @OneToOne(() => User, (user) => user.findOptions)
  @JoinColumn()
  @Expose()
  user: User;
}
