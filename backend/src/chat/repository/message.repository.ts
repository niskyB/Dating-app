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

  public async findRoomListById(id: string) {
    const pattern = '%' + id + '%';
    return await this.createQueryBuilder('message')
      .select('message.room')
      .distinctOn(['message.room'])
      .where(`message.room LIKE :pattern`, { pattern })
      .getMany();
  }

  public async findLastMessage(room: string) {
    return await this.createQueryBuilder('message')
      .where(`message.room = :room`, { room })
      .leftJoinAndSelect('message.user', 'user')
      .orderBy('message.createDate', 'DESC')
      .getOne();
  }
}
