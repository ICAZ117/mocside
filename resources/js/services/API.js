import axios from "axios";
import store from "../Store/index";

export const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL + "/api",
  withCredentials: true, // required to handle the CSRF token
});

/*
 * Add a response interceptor
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 419)
    ) {
      store.dispatch("auth/logout");
    }
    return Promise.reject(error);
  }
);