import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UserSocketGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    return true;
  }
}
