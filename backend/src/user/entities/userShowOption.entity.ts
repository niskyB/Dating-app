import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserShowOption {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ default: true })
  @Expose()
  showAge: boolean;

  @Column({ default: true })
  @Expose()
  showStudyAt: boolean;

  @Column({ default: true })
  @Expose()
  showBio: boolean;

  @Column({ default: false })
  @Expose()
  showHobbies: boolean;

  @OneToOne(() => User, (user) => user.showOptions)
  @JoinColumn()
  @Expose()
  user: User;
}
