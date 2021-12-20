import { sexEnumString } from "./../redux/user";
export interface findOption {
  minAge: number;
  maxAge: number;
  sexOption: sexEnumString;
}

export interface showOptions {
  showAge: boolean;
  showStudyAt: boolean;
  showBio: boolean;
  showHobbies: boolean;
}
export interface highlightImg {
  id: string;
  image: string;
}

export interface Hobby {
  id: string;
  name: string;
}
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
  findOptions: findOption;
  showOptions: showOptions;
  createDate: string;
  highlightImgs: highlightImg[];
}
