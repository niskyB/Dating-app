import axiosClient from "../../axios/config";
import { RegisterUserDTO } from "./interface.dto";

export const userRegister = async (data: RegisterUserDTO) => {
  const url = "/api/auth/signup";
  return axiosClient.post(url, data);
};
