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
