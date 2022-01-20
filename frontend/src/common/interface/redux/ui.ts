import { MatchCard } from "../../../component/card/interface.dto";
import { UserDataDTO } from "../dto/user";

export interface UpdatePopupData {
  isOpenning: boolean;
  name: string;
  description?: string;
  label: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  isTextArea?: boolean;
  onConfirm?: () => any;
  errorMessage?: string;
}
export interface NewMatchModel {
  isOpenning: boolean;
  target?: MatchCard;
}
export interface CropperData {
  imageUrl: string;
  croppedImage: string;
  isAvatar: boolean | null;
}
export interface SocketData {
  newMatch: string;
}
export interface UIState {
  isMatchOpen: boolean;
  isMessagesOpen: boolean;
  updatePopup: UpdatePopupData;
  newMatchModel: NewMatchModel;
  notification: NotificationData;
  cropper: CropperData;
  isLoading: boolean;
  socket: SocketData;
  isMatchAndChatOpen: boolean;
}
export enum NotificationStatus {
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  ERROR = "ERROR",
}
export type NotificationStatusString = keyof typeof NotificationStatus;

export interface NotificationData {
  isOpenning: boolean;
  status: NotificationStatusString;
  title: string;
  message: string;
}

export interface SetCropData {
  imageUrl: string;
  isAvatar: boolean | null;
}
