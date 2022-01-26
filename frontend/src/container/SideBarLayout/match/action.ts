import { DataResponse } from "../../../common/interface/common/api";
import { MatchCard } from "../../../component/card/interface.dto";
import { AxiosResponse } from "axios";
import axiosClient from "../../../axios/config";
export const getMatchList = async (
  limit: number,
  skip: number
): Promise<AxiosResponse<DataResponse<MatchCard[]>>> => {
  const url = `/api/match/${limit}&${skip}`;
  return await axiosClient.get(url);
};

export const resetDislikeList = async (): Promise<
  AxiosResponse<DataResponse<MatchCard[]>>
> => {
  const url = `/api/match/resetdislike`;
  return await axiosClient.put(url);
};

export const likeCard = async (id: string) => {
  const url = `/api/match/likeList/${id}`;
  return await axiosClient.post(url);
};

export const dislikeCard = async (id: string) => {
  const url = `/api/match/dislikeList/${id}`;
  return await axiosClient.post(url);
};
