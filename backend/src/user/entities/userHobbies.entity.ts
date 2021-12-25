import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Hobby {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ nullable: false })
  @Expose()
  hobbies: string;

  @ManyToOne(() => User, (user) => user.hobbies, {
    cascade: true,
  })
  @Expose()
  user: User;
}
