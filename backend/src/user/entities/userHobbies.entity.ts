import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Hobby {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  hobby: string;

  @ManyToOne(() => User, (user) => user.hobbies, {
    cascade: true,
  })
  user: User;
}
