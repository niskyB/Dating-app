import axiosClient from "../../axios/config";

export const logout = async () => {
  const url = "/api/auth/logout";
  return await axiosClient.post(url);
};
