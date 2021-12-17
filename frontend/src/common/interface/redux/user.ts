import { UserDataDTO } from "../dto/user";
export interface UserState {
  isLogin: boolean;
  data: UserDataDTO;
  findingConfig: FindingConfig;
}
export enum sexEnum {
  MALE = "male",
  FEMALE = "female",
}

export type sexEnumString = keyof typeof sexEnum;
export interface FindingConfig {
  sex: sexEnumString;
  minAge: number;
  maxAge: number;
}
