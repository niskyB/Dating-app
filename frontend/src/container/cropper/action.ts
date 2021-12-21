import axiosClient from "../../axios/config";

export const updateHighlightImg = async (file: File) => {
  const url = "/api/users/highlightImgs";
  let form = new FormData();
  form.append("images", file);
  return await axiosClient.put(url, form);
};
export const updateAvatar = async (file: File) => {
  const url = "/api/users/avatar";
  let form = new FormData();
  form.append("avatar", file);
  return await axiosClient.put(url, form);
};
