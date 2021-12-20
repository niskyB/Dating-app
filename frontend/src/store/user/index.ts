import { createSlice } from "@reduxjs/toolkit";
import { ReduxAction } from "../../common/interface/common/redux";
import { UserState } from "../../common/interface/redux/user";
import { userDataDefault } from "../defaultData/user";
import { userThunk } from "./thunk";
const initialState: UserState = {
  isLogin: false,
  data: userDataDefault,
};

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    toggleShowOptions: (
      state: UserState,
      {
        payload,
      }: ReduxAction<"showAge" | "showBio" | "showHobbies" | "showStudyAt">
    ) => {
      return {
        ...state,
        data: {
          ...state.data,
          showOptions: {
            ...state.data.showOptions,
            [payload]: !state.data.showOptions[payload],
          },
        },
      };
    },
    setIsLogin: (state: UserState, { payload }: ReduxAction<boolean>) => {
      return {
        ...state,
        isLogin: payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      userThunk.getCurrentUser.fulfilled,
      (state, { payload }) => {
        return {
          ...state,
          isLogin: true,
          data: { ...payload },
        };
      }
    );
    // builder.addCase(userThunk.updateUserInfo.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       [action.meta.arg.name]: action.meta.arg.newValue,
    //     },
    //   };
    // });
  },
});

export const userAction = { ...user.actions };
export default user.reducer;
