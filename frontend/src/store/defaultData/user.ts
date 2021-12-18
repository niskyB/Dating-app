import { FindingConfig } from "./../../common/interface/redux/user";
import { UserDataDTO } from "../../common/interface/dto/user";

export const userDataDefault: UserDataDTO = {
  id: "",
  address: "197 Hoang Huu Nam, Quan 9, TP.HCM",
  avatar:
    "https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/267039246_2866623933560160_829497954930763995_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=730e14&_nc_ohc=KeR6b9tImZIAX9D1nI1&_nc_ht=scontent.fdad1-2.fna&oh=00_AT9ImHALF6bM53XwSCp4Ao9D-pS_j6WD1_CjrN-3d_JEuw&oe=61BDF153",
  bio: "Full stack web developer",
  email: "dauleduc2@gmail.com",
  highlightImage: "",
  hobbies: ["game", "code", "travel"],
  matchList: [],
  phoneNumber: "0869025867",
  username: "duc dauuu",
  birthday: "2001-10-19",
  studyAt: "FPT University HCM",
};

export const findingConfigDefault: FindingConfig = {
  sex: "FEMALE",
  minAge: 18,
  maxAge: 20,
};
