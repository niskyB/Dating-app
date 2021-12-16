import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { apiResponse } from '../../utils/interface/apiResponse';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    const authToken = req.cookies['x-auth-token'] || '';

    if (!authToken) {
      throw new UnauthorizedException(
        apiResponse.send(null, {
          common: 'Not signin yet',
        }),
      );
    }

    req.currentUser = this.authService.getUserByToken(authToken);

    return true;
  }
}
