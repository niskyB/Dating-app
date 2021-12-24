import { User } from "../../common/interface/entity/user";

export interface MatchCard
  extends Omit<
    User,
    | "email"
    | "password"
    | "phone"
    | "address"
    | "findOption"
    | "createDate"
    | "like"
    | "dislike"
    | "matchList"
  > {}
