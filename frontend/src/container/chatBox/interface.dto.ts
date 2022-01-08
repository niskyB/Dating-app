import { User } from "../../common/interface/entity/user";

export interface ChatUserDTO extends Pick<User, "id" | "avatar" | "name"> {}
