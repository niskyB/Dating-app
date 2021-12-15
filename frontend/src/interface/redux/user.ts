import { UserDataDTO } from "../dto/user";
export interface UserState {
  isLogin: boolean;
  data: UserDataDTO;
}
