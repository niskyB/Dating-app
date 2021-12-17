import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../common/interface/redux/user";
import { findingConfigDefault, userDataDefault } from "../defaultData/user";
const initialState: UserState = {
  isLogin: true,
  data: userDataDefault,
  findingConfig: findingConfigDefault,
};

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const userAction = { ...user.actions };
export default user.reducer;
