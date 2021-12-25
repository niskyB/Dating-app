import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { sexEnumString } from '../enum/user.sex.enum';
import { UserFindOption } from './userFindOption.entity';
import { UserHighLightImg } from './userHighlightImg.entity';
import { Hobby } from './userHobbies.entity';
import { UserShowOption } from './userShowOption.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ nullable: false, unique: true })
  @Expose()
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  @Expose()
  name: string;

  @Column({ nullable: false, unique: true })
  @Expose()
  phone: string;

  @Column({ nullable: false })
  @Expose()
  dateOfBirth: Date;

  @Column({ nullable: false })
  @Expose()
  address: string;

  @Column({ nullable: false })
  @Expose()
  sex: sexEnumString;

  @Column({ nullable: true })
  @Expose()
  avatar: string;

  @Column({ nullable: true, length: 255 })
  @Expose()
  bio: string;

  @Column({ nullable: true })
  @Expose()
  studyAt: string;

  @Column({ default: new Date().toISOString().slice(0, 19).replace('T', ' ') })
  @Expose()
  createDate: Date;

  @OneToMany(() => Hobby, (hobby) => hobby.user)
  @Expose()
  hobbies: Hobby[];

  @OneToMany(() => UserHighLightImg, (image) => image.user)
  @Expose()
  highlightImgs: UserHighLightImg[];

  @OneToOne(() => UserShowOption, (options) => options.user, {
    cascade: true,
  })
  @Expose()
  showOptions: UserShowOption;

  @OneToOne(() => UserFindOption, (options) => options.user, {
    cascade: true,
  })
  @Expose()
  findOptions: UserFindOption;

  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  like: User[];

  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  disLike: User[];

  @ManyToMany(() => User)
  @JoinTable()
  matchList: User[];
}
