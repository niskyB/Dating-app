import axiosClient from "../../axios/config";

export const deleteHighLighImage = async (id: string) => {
  const url = `/api/users/highlightImgs/${id}`;
  return await axiosClient.delete(url);
};

export const changeAvatar = async () => {};
