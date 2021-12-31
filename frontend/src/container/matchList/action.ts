import { MatchCard } from "./../../component/card/interface.dto";
import { AxiosResponse } from "axios";
import axiosClient from "../../axios/config";
import { DataResponse } from "../../common/interface/common/api";

export const GetMatchedList = async (): Promise<
  AxiosResponse<DataResponse<MatchCard[]>>
> => {
  const url = `/api/match/matchedList`;
  return await axiosClient.get(url);
};
