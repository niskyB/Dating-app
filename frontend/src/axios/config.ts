import { UIAction } from "./../store/UI/index";
import { FormAction } from "./../store/form/index";
import { store } from "./../store/index";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { DataResponse } from "../common/interface/common/api";
import { openWarningNotification } from "../utils/notificationHelper";
import Cookies from "universal-cookie";
import { timeDelay } from "../constants/loading";
const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

const onReponseSuccess = (res: any) => {
  return res;
};

const onReponseRejected = (res: any) => {
  const { status, data } = res.response as AxiosResponse<DataResponse<never>>;
  setTimeout(() => {
    store.dispatch(UIAction.setIsLoading(false));
  }, timeDelay);
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
  if (status === 500) {
    openWarningNotification("Some unexpected error, please try again later");
  }
};

axiosClient.interceptors.response.use(onReponseSuccess, onReponseRejected);
axiosClient.interceptors.request.use((config) => {
  store.dispatch(FormAction.resetError());
  return config;
});
export default axiosClient;
