import axiosClient from "../../axios/config";
import { RegisterUserDTO } from "../../common/interface/dto/user";

export const userRegister = async (data: RegisterUserDTO) => {
  const url = "/api/auth/signup";
  return axiosClient.post(url, data);
};
