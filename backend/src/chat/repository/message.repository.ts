import { RepositoryService } from '../../utils/repository/repository.service';
import { EntityRepository } from 'typeorm';
import { Message } from '../entities/message.entity';

@EntityRepository(Message)
export class MessageRepository extends RepositoryService<Message> {
  public async findMessagesByRoom(room: string, skip: number, limit: number) {
    return await this.createQueryBuilder('message')
      .where(`message.room = :room`, { room })
      .leftJoinAndSelect('message.user', 'user')
      .skip(skip)
      .take(limit)
      .orderBy('message.createDate', 'DESC')
      .getMany();
  }
}
