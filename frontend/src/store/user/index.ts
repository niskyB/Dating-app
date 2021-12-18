import { createSlice } from "@reduxjs/toolkit";
import { ReduxAction } from "../../common/interface/common/redux";
import { UserState } from "../../common/interface/redux/user";
import { userDataDefault } from "../defaultData/user";
const initialState: UserState = {
  isLogin: true,
  data: userDataDefault,
};

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    toggleProfileConfig: (
      state: UserState,
      {
        payload,
      }: ReduxAction<"showAge" | "showBio" | "showHobbies" | "showStudyAt">
    ) => {
      // const decoyState = { ...state };
      // decoyState.data.profileConfig[payload] =
      //   !state.data.profileConfig[payload];

      return {
        ...state,
        data: {
          ...state.data,
          profileConfig: {
            ...state.data.profileConfig,
            [payload]: !state.data.profileConfig[payload],
          },
        },
      };
    },
  },
  extraReducers: (builder) => {},
});

export const userAction = { ...user.actions };
export default user.reducer;
