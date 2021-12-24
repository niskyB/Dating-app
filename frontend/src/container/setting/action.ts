import axiosClient from "../../axios/config";
import { findOptionDTO } from "./interface.dto";

export const updateChangeOption = async (data: findOptionDTO) => {
  const url = "/api/users/findOption";
  return await axiosClient.put(url, data);
};
