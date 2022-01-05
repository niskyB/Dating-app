import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, SocketExtend } from 'socket.io';
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
  async handleJoiChat(
    @ConnectedSocket() client: SocketExtend,
    @MessageBody() data: string,
  ) {
    const currentId = client.user.id;
    let room: string;

    if (currentId.localeCompare(data) < 1) {
      room = currentId + '@' + data;
    } else {
      room = data + '@' + currentId;
    }

    client.join(room);
    this.server.to(room).emit('test', { message: 'Test join room' });
  }
}
