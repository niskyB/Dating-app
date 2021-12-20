import { User } from "../entity/user";

export interface UserDataDTO extends Omit<User, "password"> {}
