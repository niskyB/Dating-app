import axiosClient from "../../axios/config";

export const updateUserInfo = async (name: string, newValue: string) => {
  const url = `/api/users/${name}`;
  return await axiosClient.put(url, { [name]: newValue });
};
