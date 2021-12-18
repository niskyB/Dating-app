import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Sex } from '../enum/user.sex.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  phone: string;

  @Column({ nullable: false })
  dateOfBirth: Date;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  sex: Sex;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, length: 255 })
  bio: string;

  @Column({ default: new Date().toISOString().slice(0, 19).replace('T', ' ') })
  createDate: Date;
}
