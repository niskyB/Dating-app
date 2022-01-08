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
import { apiResponse } from 'src/common/response/apiResponse';
import { ResponseMessage } from 'src/constants/message/responseMessage.enum';

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

    this.server.to(data.room).emit(ChatAction.CHAT_RECEIVE, message);

    await this.chatService.saveMessage(data.room, message);
  }
}
