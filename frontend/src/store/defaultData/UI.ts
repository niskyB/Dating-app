import {
  CropperData,
  NewMatchModel,
  NotificationData,
  SocketData,
  UpdatePopupData,
} from "../../common/interface/redux/ui";
export const updateInfoPopupDefault: UpdatePopupData = {
  name: "unknow",
  description: "unknow",
  label: "unknow",
  isOpenning: false,
};

export const newMatchModelDefault: NewMatchModel = {
  isOpenning: false,
};

export const notificationDefault: NotificationData = {
  status: "SUCCESS",
  title: "",
  message: "",
  isOpenning: false,
};

export const cropperDefault: CropperData = {
  imageUrl: "",
  croppedImage: "",
  isAvatar: null,
};

export const socketDefault: SocketData = {
  newMatch: "0",
};
