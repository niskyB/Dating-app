import { User } from "../../common/interface/entity/user";

export interface Message {
  content: string;
  createDate: string;
  id: string;
  room: string;
  seen: string;
  user: User;
}
