import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../axios/config";

export const userThunk = {
  getCurrentUser: createAsyncThunk("getCurrentUser", async () => {
    const url = "/api/users";
    const res = axiosClient.get(url);
    console.log(res);
  }),
};
