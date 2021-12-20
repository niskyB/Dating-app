import { User } from "../../common/interface/entity/user";

export interface UpdateUserTextField
  extends Pick<
    User,
    "name" | "address" | "studyAt" | "phone" | "email" | "dateOfBirth" | "bio"
  > {}

export interface UpdateUserInput {
  name: string;
  newValue: string;
}
