import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'notifications' })
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;
}
