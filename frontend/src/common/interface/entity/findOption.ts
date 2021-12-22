import { sexEnumString } from "../redux/user";

export interface FindOption {
  minAge: number;
  maxAge: number;
  sexOption: sexEnumString;
}
