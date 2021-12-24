import axiosClient from "../../axios/config";

export const removeHobby = async (id: string) => {
  const url = `/api/users/hobbies/${id}`;
  return await axiosClient.delete(url);
};
