import { AxiosResponse } from "axios";
import axiosClient from "../../axios/config";
import { DataResponse } from "../../common/interface/common/api";
import { ChatUserDTO } from "./interface.dto";

export const getChatUserInfo = async (
  id: string
): Promise<AxiosResponse<DataResponse<ChatUserDTO>>> => {
  const url = `/api/users/getUserWithBasicInfo/${id}`;
  return await axiosClient.get(url);
};
