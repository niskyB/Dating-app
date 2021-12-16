import { UIState } from "../../common/interface/redux/ui";
import { createSlice } from "@reduxjs/toolkit";
const initialState: UIState = {
  isMatchOpen: true,
  isMessagesOpen: false,
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
  },
  extraReducers: (builder) => {},
});

export const UIAction = { ...UI.actions };
export default UI.reducer;
