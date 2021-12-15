import { User } from "../entity/user";

export interface UserDataDTO extends Omit<User, "password"> {}
export interface LoginUserDTO extends Pick<User, "email" | "password"> {}
export interface RegisterUserDTO
  extends Pick<
    User,
    "email" | "password" | "address" | "username" | "phoneNumber"
  > {}
