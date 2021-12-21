import axiosClient from "../../axios/config";

export const updateHighlightImg = (file: File) => {
  const url = "/api/users/highlightImgs";
  let form = new FormData();
  form.append("images", file);
  axiosClient.put(url, form);
};
export const updateAvatar = (file: File) => {
  const url = "/api/users/avatar";
  let form = new FormData();
  form.append("avatar", file);
  axiosClient.put(url, form);
};
