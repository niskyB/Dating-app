import { UseGuards } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { UserSocketGuard } from '../auth/guard/authSocket.guard';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
  allowEIO3: true,
})
@UseGuards(UserSocketGuard)
export class ChatGateway {}
