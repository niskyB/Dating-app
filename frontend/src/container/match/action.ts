import { DataResponse } from "./../../common/interface/common/api";
import { MatchCard } from "./../../component/card/interface.dto";
import { AxiosResponse } from "axios";
import axiosClient from "../../axios/config";
export const getMatchList = async (): Promise<
  AxiosResponse<DataResponse<MatchCard[]>>
> => {
  const url = `/api/match`;
  return await axiosClient.get(url);
};

export const likeCard = async (id: string) => {
  const url = `/api/match/likeList/${id}`;
  return await axiosClient.post(url);
};

export const dislikeCard = async (id: string) => {
  const url = `/api/match/dislikeList/${id}`;
  return await axiosClient.post(url);
};

export const viewAgain = async (): Promise<
  AxiosResponse<DataResponse<MatchCard[]>>
> => {
  const url = `/api/match/viewagain`;
  return await axiosClient.get(url);
};
