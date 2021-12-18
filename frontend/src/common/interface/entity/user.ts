export interface User {
  id: string;
  email: string;
  password: string;
  bio: string;
  username: string;
  phoneNumber: string;
  address: string;
  avatar: string;
  hobbies: string[];
  matchList: User[];
  highlightImage: string;
  birthday: string;
  studyAt: string;
}
