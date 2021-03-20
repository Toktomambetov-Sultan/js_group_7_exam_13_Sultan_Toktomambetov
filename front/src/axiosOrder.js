import axios from "axios";
import config from "./config";
import store from "./store/mainStore";

const axiosOrder = axios.create({
  baseURL: config.BaseUrl,
});

axiosOrder.interceptors.request.use((config) => {
  store.getState().user.user &&
    (config.headers[
      "Authorization"
    ] = store.getState().user.user.token);
  return config;
});

export default axiosOrder;
