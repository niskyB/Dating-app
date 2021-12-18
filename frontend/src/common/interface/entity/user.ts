import { sexEnumString } from "./../redux/user";
export interface findConfig {
  minAge: number;
  maxAge: number;
  sex: sexEnumString;
}

export interface profileConfig {
  showAge: boolean;
  showStudyAt: boolean;
  showBio: boolean;
  showHobbies: boolean;
}
export interface highlightImg {
  id: string;
  image: string;
}
export interface User {
  id: string;
  email: string;
  password: string;
  bio: string;
  name: string;
  phoneNumber: string;
  sex: sexEnumString;
  address: string;
  avatar: string;
  hobbies: string[];
  matchList: User[];
  highlightImage: string;
  dayOfBirth: string;
  studyAt: string;
  findConfig: findConfig;
  profileConfig: profileConfig;
  createDate: string;
  highlightImgs: highlightImg[];
}
