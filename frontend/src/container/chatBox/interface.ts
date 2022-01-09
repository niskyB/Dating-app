import { MatchCard } from "../../component/card/interface.dto";

export interface Message {
  content: string;
  createDate: string;
  id: string;
  room: string;
  seen: string;
  sender: MatchCard;
}
