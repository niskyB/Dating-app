import { FindingConfig } from "./../../common/interface/redux/user";
import { UserDataDTO } from "../../common/interface/dto/user";

export const userDataDefault: UserDataDTO = {
  id: "",
  address: "197 Hoang Huu Nam, Quan 9, TP.HCM",
  avatar:
    "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-1/p240x240/205956104_2751433955079159_2840020984542922686_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=7206a8&_nc_ohc=NyHJxUybJBgAX8zpUUb&_nc_ht=scontent.fdad2-1.fna&oh=00_AT88K8Y0bmIFTbXkvht0trDlGFM4nGJEY5Z11ur_OwjMdg&oe=61E09EE4",
  bio: "Full stack web developer",
  email: "dauleduc2@gmail.com",
  highlightImage: "",
  hobbies: ["game", "code", "travel"],
  matchList: [],
  phoneNumber: "0869025867",
  username: "duc dauuu",
  birthday: "2001-10-19",
};

export const findingConfigDefault: FindingConfig = {
  sex: "FEMALE",
  minAge: 18,
  maxAge: 20,
};
