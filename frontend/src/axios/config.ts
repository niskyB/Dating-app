import { FormAction } from "./../store/form/index";
import { store } from "./../store/index";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { DataResponse } from "../common/interface/common/api";
import * as env from "../constants/env";
const axiosClient: AxiosInstance = axios.create({
  baseURL: env.SERVER_URL,
  withCredentials: true,
});

const onReponseSuccess = (res: any) => {
  return res;
};

const onReponseRejected = (res: any) => {
  const { status, data } = res.response as AxiosResponse<DataResponse<never>>;
  if (status === 400) {
    store.dispatch(FormAction.setError(data.errors));
  }
};

axiosClient.interceptors.response.use(onReponseSuccess, onReponseRejected);
axiosClient.interceptors.request.use((config) => {
  store.dispatch(FormAction.resetError());
  return config;
});
export default axiosClient;
