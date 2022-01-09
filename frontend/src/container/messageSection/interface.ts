import { ChatBoxUser } from "./interface.dto";

export interface ChatBox {
  id: string;
  content: string;
  seen: boolean;
  createDate: Date;
  room: string;
  sender: ChatBoxUser;
  partner: ChatBoxUser;
}
