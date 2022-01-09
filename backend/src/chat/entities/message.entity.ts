import { Expose } from 'class-transformer';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ nullable: false })
  @Expose()
  content: string;

  @Column({ default: false })
  @Expose()
  seen: boolean;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
  })
  @Expose()
  createDate: Date;

  @Column({ nullable: false })
  @Expose()
  room: string;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @Expose()
  user: User;
}
