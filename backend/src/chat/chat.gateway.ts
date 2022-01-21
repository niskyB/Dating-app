import { HttpStatus, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, SocketExtend } from 'socket.io';
import { LIMIT } from '../constants/chat.constants';
import { UserSocketGuard } from '../auth/guard/authSocket.guard';
import { ChatAction } from './chat.actions';
import { ChatService } from './chat.service';
import { GetChatDto } from './dto/get-chat.dto';
import { SendChatDto } from './dto/send-chat.dto';
import { apiResponse } from '../common/response/apiResponse';
import { ResponseMessage } from '../constants/message/responseMessage.enum';
import { plainToClass } from 'class-transformer';
import { MatchCardDto } from '../match/dto/match-card.dto';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
  allowEIO3: true,
})
@UseGuards(UserSocketGuard)
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage(ChatAction.CHAT_JOIN)
  async handleJoinChat(
    @ConnectedSocket() client: SocketExtend,
    @MessageBody() id: string,
  ) {
    const currentId = client.user.id;
    let room: string;

    if (currentId.localeCompare(id) < 1) {
      room = currentId + '@' + id;
    } else {
      room = id + '@' + currentId;
    }

    client.join(room);
  }

  @SubscribeMessage(ChatAction.CHAT_GET)
  async handleGetChat(@MessageBody() data: GetChatDto) {
    const messages = await this.chatService.getChat(
      data.room,
      data.page,
      LIMIT,
    );

    this.server.to(data.room).emit(ChatAction.CHAT_GET, messages);
  }

  @SubscribeMessage(ChatAction.CHAT_SEND)
  async handleSendMessage(
    @ConnectedSocket() client: SocketExtend,
    @MessageBody() data: SendChatDto,
  ) {
    if (!data.room || !data.content) {
      throw new WsException(
        apiResponse.send(null, {
          common: ResponseMessage.INVALID_ROOM,
          status: HttpStatus.BAD_REQUEST,
        }),
      );
    }

    const message = await this.chatService.createMessage(
      data.room,
      data.content,
      client.user.id,
    );

    const sender = plainToClass(MatchCardDto, message.user, {
      excludeExtraneousValues: true,
    });

    const messageDto: MessageDto = plainToClass(
      MessageDto,
      { ...message, sender },
      { excludeExtraneousValues: true },
    );

    this.server.to(data.room).emit(ChatAction.CHAT_RECEIVE, messageDto);

    await this.chatService.saveMessage(data.room, message);

    const partnerId = data.room.replace(client.user.id, '').replace('@', '');
    this.server
      .to([partnerId, client.user.id])
      .emit(ChatAction.CHAT_UPDATE_CHAT_LIST);
  }

  @SubscribeMessage(ChatAction.CHAT_JOIN_GLOBAL)
  async joinChatGlobalRoom(@ConnectedSocket() client: SocketExtend) {
    client.join(client.user.id);
  }

  @SubscribeMessage(ChatAction.CHAT_LEAVE)
  async handleLeaveChat(
    @ConnectedSocket() client: SocketExtend,
    @MessageBody() room: string,
  ) {
    client.leave(room);
  }

  @SubscribeMessage(ChatAction.CHAT_SEEN_MESSAGE)
  async handleSeenMessage(
    @ConnectedSocket() client: SocketExtend,
    @MessageBody() room: string,
  ) {
    const messages = await this.chatService.getLastMessage(room);
    if (messages && !messages.seen && messages.user.id !== client.user.id) {
      messages.seen = true;
      await this.chatService.saveMessage(room, messages);
      this.server.to(room).emit(ChatAction.CHAT_SEEN_MESSAGE);
    }
  }
}
