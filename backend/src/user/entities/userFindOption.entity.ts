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
  id: string;

  @Column({ default: 18 })
  minAge: number;

  @Column({ default: 22 })
  maxAge: number;

  @Column({ nullable: false })
  sexOption: sexEnumString;

  @OneToOne(() => User, (user) => user.findOptions, {
    cascade: true,
  })
  @JoinColumn()
  user: User;
}
