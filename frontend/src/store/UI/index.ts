import { updateInfoPopupDefault } from "../defaultData/UI";
import { UIState, UpdatePopupData } from "../../common/interface/redux/ui";
import { createSlice } from "@reduxjs/toolkit";
import { ReduxAction } from "../../common/interface/common/redux";
const initialState: UIState = {
  isMatchOpen: true,
  isMessagesOpen: false,
  updatePopup: updateInfoPopupDefault,
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
  },
  extraReducers: (builder) => {},
});

export const UIAction = { ...UI.actions };
export default UI.reducer;
