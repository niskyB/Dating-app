import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserHighLightImg {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ nullable: false })
  @Expose()
  image: string;

  @ManyToOne(() => User, (user) => user.highlightImgs, {
    nullable: false,
    cascade: true,
  })
  @Expose()
  user: User;
}
