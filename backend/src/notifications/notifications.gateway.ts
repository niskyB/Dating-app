import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, SocketExtend } from 'socket.io';
import { socketResponse } from 'src/common/interface/socketResponse';
import { UserSocketGuard } from '../auth/guard/authSocket.guard';
import { NotificationAction } from './notifications.actions';

@WebSocketGateway({ namespace: 'notifications' })
@UseGuards(UserSocketGuard)
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage(NotificationAction.NOTIFICATIONS_CONNECTION)
  handleInitNotification(@ConnectedSocket() client: SocketExtend) {
    client.join('notifications-' + client.user.id);
    return socketResponse.send({}, NotificationAction.NOTIFICATIONS_CONNECTION);
  }
}
