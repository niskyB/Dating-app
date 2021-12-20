import { FindingConfig } from "./../../common/interface/redux/user";
import { UserDataDTO } from "../../common/interface/dto/user";
import { profileConfig } from "../../common/interface/entity/user";
import {
  NotificationData,
  SuccessModel,
} from "../../common/interface/redux/ui";
export const findingConfigDefault: FindingConfig = {
  sex: "FEMALE",
  minAge: 18,
  maxAge: 20,
};
export const profileConfigDefault: profileConfig = {
  showAge: true,
  showBio: true,
  showHobbies: false,
  showStudyAt: true,
};
export const userDataDefault: UserDataDTO = {
  id: "",
  address: "197 Hoang Huu Nam, Quan 9, TP.HCM",
  avatar:
    "https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/267039246_2866623933560160_829497954930763995_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=730e14&_nc_ohc=KeR6b9tImZIAX9D1nI1&_nc_ht=scontent.fdad1-2.fna&oh=00_AT9ImHALF6bM53XwSCp4Ao9D-pS_j6WD1_CjrN-3d_JEuw&oe=61BDF153",
  bio: "Full snack web developer",
  email: "dauleduc2@gmail.com",
  highlightImgs: [
    {
      id: "1",
      image:
        "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/74231862_712055052594861_6414827062971858944_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=ad2b24&_nc_ohc=hvzzsrqFgEsAX-WrCxf&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT-B-vj375LGTTRuDRJycevy2U-uXZ2mEvl84mlVuAYTiA&oe=61E22B23",
    },
  ],
  hobbies: [
    { id: "1", name: "game" },
    { id: "2", name: "travel" },
    { id: "3", name: "sleep" },
  ],
  matchList: [],
  phone: "0869025867",
  name: "duc dauuu",
  dateOfBirth: "2001-10-19",
  studyAt: "FPT University HCM",
  findConfig: findingConfigDefault,
  profileConfig: profileConfigDefault,
  sex: "MALE",
  createDate: "",
};

export const successModelDefault: SuccessModel = {
  isOpenning: false,
  message: "",
  title: "",
};

export const notificationDefault: NotificationData = {
  status: "SUCCESS",
  title: "",
  message: "",
  isOpenning: false,
};
