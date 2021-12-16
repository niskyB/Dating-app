import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { apiResponse } from '../../utils/interface/apiResponse';
import { ResponseMessage } from '../../utils/message/responseMessage.enum';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    const authToken = req.cookies['x-auth-token'] || '';

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
