import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as Cookie from 'cookie';
import { TOKEN } from '../../constants/cookie.constants';
import { apiResponse } from '../../common/response/apiResponse';
import { ResponseMessage } from '../../constants/message/responseMessage.enum';
import { AuthService } from '../auth.service';
import { SocketExtend } from 'socket.io';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class UserSocketGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  private async cookieParserSocket(context: ExecutionContext) {
    const client: SocketExtend = context.switchToWs().getClient();
    if (client.handshake.headers.cookie) {
      client.cookies = Cookie.parse(client.handshake.headers.cookie);
    }
    return client;
  }

  async canActivate(context: ExecutionContext) {
    const client = await this.cookieParserSocket(context);
    if (!client.cookies) {
      throw new WsException(
        apiResponse.send(null, {
          common: ResponseMessage.UNAUTHORIZED,
          status: HttpStatus.UNAUTHORIZED,
        }),
      );
    }

    const authToken = client.cookies[TOKEN] || '';
    if (!authToken) {
      throw new WsException(
        apiResponse.send(null, {
          common: ResponseMessage.UNAUTHORIZED,
          status: HttpStatus.UNAUTHORIZED,
        }),
      );
    }

    client.user = this.authService.getUserByToken(authToken);
    if (!client.user) {
      throw new WsException(
        apiResponse.send(null, {
          common: ResponseMessage.FORBIDDEN,
          status: HttpStatus.FORBIDDEN,
        }),
      );
    }

    return true;
  }
}
