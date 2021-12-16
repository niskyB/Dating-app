import { UserToken } from 'src/auth/entities/user.token';

declare global {
  namespace Express {
    interface Request {
      currentUser: UserToken;
    }
  }
}
