import axiosClient from "../../axios/config";
import { LoginUserDTO } from "./interface";

export const login = async (data: LoginUserDTO) => {
  const url = "/api/auth/signin";
  return axiosClient.post(url, data);
};
