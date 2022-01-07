import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, SocketExtend } from 'socket.io';
import { UserRepository } from '../user/repository/user.repository';
import { UserSocketGuard } from '../auth/guard/authSocket.guard';
import { NotificationAction } from './notifications.actions';
import { NotificationsService } from './notifications.service';

@WebSocketGateway({
  namespace: 'notifications',
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
  allowEIO3: true,
})
@UseGuards(UserSocketGuard)
export class NotificationsGateway {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly userRepository: UserRepository,
  ) {}
  @WebSocketServer()
  server: Server;

  emitNotiToRoom(event: string, room: string, data: any) {
    this.server.to(room).emit(event, data);
  }

  @SubscribeMessage(NotificationAction.NOTIFICATIONS_CONNECTION)
  async handleInitNotification(@ConnectedSocket() client: SocketExtend) {
    const user = await this.userRepository.findOneByField('id', client.user.id);
    const roomName = 'notifications-' + client.user.id;
    client.join(roomName);
    console.log(user.name, 'join the room!');

    const noti = await this.notificationsService.getNoti(client.user.id);
    this.server
      .to(roomName)
      .emit(NotificationAction.NOTIFICATIONS_GET, { newMatch: noti });
  }

  @SubscribeMessage(NotificationAction.NOTIFICATIONS_RESET)
  async handleResetNotification(@ConnectedSocket() client: SocketExtend) {
    const roomName = 'notifications-' + client.user.id;
    await this.notificationsService.resetNoti(client.user.id);
    const noti = await this.notificationsService.getNoti(client.user.id);

    this.server
      .to(roomName)
      .emit(NotificationAction.NOTIFICATIONS_GET, { newMatch: noti });
  }
}
