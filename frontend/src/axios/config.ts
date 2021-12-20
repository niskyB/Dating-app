import { FormAction } from "./../store/form/index";
import { store } from "./../store/index";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { DataResponse } from "../common/interface/common/api";
import * as env from "../constants/env";
import { openWarningNotification } from "../utils/notificationHelper";
import Cookies from "universal-cookie";
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
    if (data.errors.common) {
      openWarningNotification(data.errors.common);
    }
    store.dispatch(FormAction.setError(data.errors));
  }
  if (status === 401) {
    const cookies = new Cookies();
    cookies.set("x-auth-token", "", { maxAge: -999 });
  }
};

axiosClient.interceptors.response.use(onReponseSuccess, onReponseRejected);
axiosClient.interceptors.request.use((config) => {
  store.dispatch(FormAction.resetError());
  return config;
});
export default axiosClient;
