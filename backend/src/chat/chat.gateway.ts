import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, SocketExtend } from 'socket.io';
import { LIMIT } from '../constants/chat.constants';
import { UserSocketGuard } from '../auth/guard/authSocket.guard';
import { ChatAction } from './chat.actions';
import { ChatService } from './chat.service';

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
  async handleGetChat(
    @ConnectedSocket() client: SocketExtend,
    @MessageBody() data: any,
  ) {
    const messages = await this.chatService.getChat(
      data.room,
      data.page,
      LIMIT,
    );

    this.server.to(data.room).emit(ChatAction.CHAT_GET, messages);
  }
}
