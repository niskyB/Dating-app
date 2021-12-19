import axiosClient from "../axios/config";
import { LoginUserDTO } from "../container/login/interface";

export const userApi = {
  login: async (data: LoginUserDTO) => {
    const url = "/api/auth/signin";
    return axiosClient.post(url, data);
  },
};
