import axios, { AxiosInstance } from "axios";
import * as env from "../constants/env";
const axiosClient: AxiosInstance = axios.create({
  baseURL: env.SERVER_URL,
  withCredentials: true,
});

export default axiosClient;
