import { User } from "../../common/interface/entity/user";

export interface ChatBoxUser
  extends Pick<
    User,
    "id" | "name" | "dateOfBirth" | "sex" | "avatar" | "bio" | "studyAt"
  > {}
