import {
  CropperData,
  NotificationData,
  SocketData,
  SuccessModel,
  UpdatePopupData,
} from "../../common/interface/redux/ui";
export const updateInfoPopupDefault: UpdatePopupData = {
  name: "unknow",
  description: "unknow",
  label: "unknow",
  isOpenning: false,
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

export const cropperDefault: CropperData = {
  imageUrl: "",
  croppedImage: "",
  isAvatar: null,
};

export const socketDefault: SocketData = {
  newMatch: "0",
};
