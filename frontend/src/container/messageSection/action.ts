import { AxiosResponse } from "axios";
import axiosClient from "../../axios/config";
import { DataResponse } from "../../common/interface/common/api";
import { ChatBox } from "./interface";

export const getChatList = async (): Promise<
  AxiosResponse<DataResponse<ChatBox[]>>
> => {
  const url = `/api/chat/chatList`;
  return await axiosClient.get(url);
};
