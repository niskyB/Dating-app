import { PickType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { MatchCardDto } from '../../match/dto/match-card.dto';
import { Message } from '../entities/message.entity';

export class MessageDto extends PickType(Message, [
  'id',
  'content',
  'createDate',
  'room',
  'seen',
]) {
  @Expose()
  partner: MatchCardDto;

  @Expose()
  sender: MatchCardDto;
}
