import {
  cropperDefault,
  newMatchModelDefault,
  notificationDefault,
  socketDefault,
  updateInfoPopupDefault,
} from "../defaultData/UI";
import {
  NewMatchModel,
  NotificationData,
  SetCropData,
  UIState,
  UpdatePopupData,
} from "../../common/interface/redux/ui";
import { createSlice } from "@reduxjs/toolkit";
import { ReduxAction } from "../../common/interface/common/redux";
import { SocketNotificationPayload } from "./interface";

const initialState: UIState = {
  isMatchOpen: true,
  isMessagesOpen: false,
  isMatchAndChatOpen: false,
  isLoading: false,
  updatePopup: updateInfoPopupDefault,
  newMatchModel: newMatchModelDefault,
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
    onCloseNewMatchPopup: (state: UIState) => {
      return {
        ...state,
        newMatchModel: newMatchModelDefault,
      };
    },
    setNewMatchPopup: (
      state: UIState,
      { payload }: ReduxAction<NewMatchModel>
    ) => {
      return {
        ...state,
        newMatchModel: { ...payload },
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
    resetCropper: (state: UIState) => {
      return {
        ...state,
        cropper: cropperDefault,
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
    toggleMatchAndChat: (state: UIState) => {
      return {
        ...state,
        isMatchAndChatOpen: !state.isMatchAndChatOpen,
      };
    },
    setNewMessageNoti: (state: UIState, { payload }: ReduxAction<number>) => {
      return {
        ...state,
        socket: {
          ...state.socket,
          newMessages: payload,
        },
      };
    },
  },
  extraReducers: (builder) => {},
});

export const UIAction = { ...UI.actions };
export default UI.reducer;
