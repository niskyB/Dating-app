import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { apiResponse } from '../../common/response/apiResponse';
import { ResponseMessage } from '../../constants/message/responseMessage.enum';
import { MAX_AGE, TOKEN } from '../../constants/cookie.constants';
import { SocketExtend } from 'socket.io';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    const client: SocketExtend = context.switchToWs().getClient();
    const authToken = req.cookies[TOKEN] || '';

    if (!authToken) {
      throw new UnauthorizedException(
        apiResponse.send(null, {
          common: ResponseMessage.UNAUTHORIZED,
        }),
      );
    }

    req.currentUser = this.authService.getUserByToken(authToken);

    if (!req.currentUser) {
      throw new ForbiddenException(
        apiResponse.send(null, {
          common: ResponseMessage.FORBIDDEN,
        }),
      );
    }

    return true;
  }
}
