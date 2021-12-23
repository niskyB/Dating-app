import { User } from "../entity/user";

export interface UserDataDTO extends Omit<User, "password"> {}

export interface LikeUser {
  id: string;
  userId: string;
}

export interface DislikeUser extends LikeUser {}
