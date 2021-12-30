import { FindingOptions } from "./../../common/interface/redux/user";
import { UserDataDTO } from "../../common/interface/dto/user";
import { ShowOptions } from "../../common/interface/entity/showOptions";
export const findingOptionsDefault: FindingOptions = {
  sexOption: "FEMALE",
  minAge: 18,
  maxAge: 20,
};
export const showOptionsDefault: ShowOptions = {
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
  hobbies: [],
  matchList: [],
  phone: "",
  name: "",
  dateOfBirth: "",
  studyAt: "",
  findOptions: findingOptionsDefault,
  showOptions: showOptionsDefault,
  sex: "MALE",
  createDate: "",
  like: [],
  dislike: [],
};
