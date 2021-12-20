import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../axios/config";
import { UserDataDTO } from "../../common/interface/dto/user";

export const userThunk = {
  getCurrentUser: createAsyncThunk<UserDataDTO>("getCurrentUser", async () => {
    const url = "/api/users";
    return (await axiosClient.get(url)).data.data;
  }),
  // updateUserInfo: createAsyncThunk<
  //   Partial<UpdateUserTextField>,
  //   UpdateUserInput
  // >("updateUserInfo", async ({ name, newValue }) => {
  //   return await (
  //     await updateUserInfo(name, newValue)
  //   ).data;
  // }),
};
