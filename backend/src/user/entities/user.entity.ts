import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  address: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, length: 255 })
  bio: string;

  @Column({ default: new Date().toISOString().slice(0, 19).replace('T', ' ') })
  createDate: Date;
}
