import { UserToken } from './src/auth/dto/user-token.dto';

declare global {
  namespace Express {
    interface Request {
      currentUser: UserToken;
    }
  }
}
