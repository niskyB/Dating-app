import { User } from "../../common/interface/entity/user";

export interface LoginUserDTO extends Pick<User, "email" | "password"> {}
