import { UserToken } from './src/auth/dto/user-token.dto';
import { Socket } from 'socket.io';

declare global {
  namespace Express {
    interface Request {
      currentUser: UserToken;
    }
  }
}

declare module 'socket.io' {
  export class SocketExtend extends Socket {
    user?: UserToken;
    cookies: Record<string, string>;
    socketCookies: string;
  }
}
