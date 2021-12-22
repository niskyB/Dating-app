import { sexEnumString } from "./../redux/user";
import { FindOption } from "./findOption";
import { HighlightImg } from "./highlightImg";
import { Hobby } from "./hobby";
import { ShowOptions } from "./showOptions";

export interface User {
  id: string;
  email: string;
  password: string;
  bio: string;
  name: string;
  phone: string;
  sex: sexEnumString;
  address: string;
  avatar: string;
  hobbies: Hobby[];
  matchList: User[];
  dateOfBirth: string;
  studyAt: string;
  findOptions: FindOption;
  showOptions: ShowOptions;
  createDate: string;
  highlightImgs: HighlightImg[];
}
