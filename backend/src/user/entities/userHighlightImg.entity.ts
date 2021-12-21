import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserHighLightImg {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  image: string;

  @ManyToOne(() => User, (user) => user.highlightImgs, {
    nullable: false,
    cascade: true,
  })
  user: User;
}
