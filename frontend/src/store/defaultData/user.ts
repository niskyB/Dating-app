import { FindingOptions } from "./../../common/interface/redux/user";
import { UserDataDTO } from "../../common/interface/dto/user";
import { showOptions } from "../../common/interface/entity/user";
import {
  NotificationData,
  SuccessModel,
} from "../../common/interface/redux/ui";
export const findingOptionsDefault: FindingOptions = {
  sexOption: "FEMALE",
  minAge: 18,
  maxAge: 20,
};
export const showOptionsDefault: showOptions = {
  showAge: true,
  showBio: true,
  showHobbies: false,
  showStudyAt: true,
};
export const userDataDefault: UserDataDTO = {
  id: "",
  address: "",
  avatar: "",
  bio: "",
  email: "",
  highlightImgs: [],
  hobbies: [
    // { id: "1", name: "game" },
    // { id: "2", name: "travel" },
    // { id: "3", name: "sleep" },
  ],
  matchList: [],
  phone: "",
  name: "",
  dateOfBirth: "",
  studyAt: "",
  findOptions: findingOptionsDefault,
  showOptions: showOptionsDefault,
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
