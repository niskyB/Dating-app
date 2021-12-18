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
  id: string;

  @Column({ default: true })
  showAge: boolean;

  @Column({ default: true })
  showStudy: boolean;

  @Column({ default: true })
  showBio: boolean;

  @Column({ default: false })
  showHobbies: boolean;

  @OneToOne(() => User, (user) => user.showOptions)
  @JoinColumn()
  user: User;
}
