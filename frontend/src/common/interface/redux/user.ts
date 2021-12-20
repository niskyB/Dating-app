import { UserDataDTO } from "../dto/user";
export interface UserState {
  isLogin: boolean;
  data: UserDataDTO;
}
export enum sexEnum {
  MALE = "male",
  FEMALE = "female",
}

export type sexEnumString = keyof typeof sexEnum;
export interface FindingOptions {
  sexOption: sexEnumString;
  minAge: number;
  maxAge: number;
}
