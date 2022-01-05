import {
  cropperDefault,
  notificationDefault,
  socketDefault,
  successModelDefault,
  updateInfoPopupDefault,
} from "../defaultData/UI";
import {
  NotificationData,
  SetCropData,
  SuccessModelData,
  UIState,
  UpdatePopupData,
} from "../../common/interface/redux/ui";
import { createSlice } from "@reduxjs/toolkit";
import { ReduxAction } from "../../common/interface/common/redux";
import { SocketNotificationPayload } from "./interface";

const windowSize = window.innerWidth;

const initialState: UIState = {
  isMatchOpen: true,
  isMessagesOpen: false,
  isSideBarOpen: windowSize < 640 ? false : true,
  isLoading: false,
  updatePopup: updateInfoPopupDefault,
  successModel: successModelDefault,
  notification: notificationDefault,
  socket: socketDefault,
  cropper: cropperDefault,
};

export const UI = createSlice({
  name: "UI",
  initialState: initialState,
  reducers: {
    resetState: () => {
      return { ...initialState };
    },
    openMatchUI: (state: UIState) => {
      return {
        ...state,
        isMatchOpen: true,
        isMessagesOpen: false,
      };
    },
    openMessagesUI: (state: UIState) => {
      return {
        ...state,
        isMatchOpen: false,
        isMessagesOpen: true,
      };
    },
    closeUpdatePopup: (state: UIState) => {
      return {
        ...state,
        updatePopup: updateInfoPopupDefault,
      };
    },
    setUpdatePopup: (
      state: UIState,
      { payload }: ReduxAction<UpdatePopupData>
    ) => {
      return {
        ...state,
        updatePopup: { ...payload },
      };
    },
    onCloseSuccessModel: (state: UIState) => {
      return {
        ...state,
        successModel: successModelDefault,
      };
    },
    setSuccessModel: (
      state: UIState,
      { payload }: ReduxAction<SuccessModelData>
    ) => {
      return {
        ...state,
        successModel: { ...payload },
      };
    },
    setNotification: (
      state: UIState,
      { payload }: ReduxAction<NotificationData>
    ) => {
      return {
        ...state,
        notification: { ...payload },
      };
    },
    onCloseNotification: (state: UIState) => {
      return {
        ...state,
        notification: notificationDefault,
      };
    },
    setCropImage: (state: UIState, { payload }: ReduxAction<SetCropData>) => {
      return {
        ...state,
        cropper: {
          ...state.cropper,
          imageUrl: payload.imageUrl,
          isAvatar: payload.isAvatar,
        },
      };
    },
    setCroppedImage: (state: UIState, { payload }: ReduxAction<string>) => {
      return {
        ...state,
        cropper: {
          ...state.cropper,
          croppedImage: payload,
        },
      };
    },
    setIsLoading: (state: UIState, { payload }: ReduxAction<boolean>) => {
      return {
        ...state,
        isLoading: payload,
      };
    },
    setSocketNotification: (
      state: UIState,
      { payload }: ReduxAction<SocketNotificationPayload>
    ) => {
      return {
        ...state,
        socket: {
          ...state.socket,
          ...payload,
        },
      };
    },
  },
  extraReducers: (builder) => {},
});

export const UIAction = { ...UI.actions };
export default UI.reducer;
