/************************************************ Node modules needed *************************************************/
import axios from "axios";

/********************************************** Internal library imports **********************************************/
import { Logger } from "/src/utils";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("axios");

/**************************************** Axios Instance Default Configuration ****************************************/
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

/**************************************** Axios Instance Request Interceptors *****************************************/
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : undefined;
    return config;
  },
  (error) => Promise.reject(error)
);

/**************************************** Axios Instance Response Interceptors ****************************************/
axiosInstance.interceptors.response.use(
  (response) => {
    const responseObj = response.data;
    logger.debug(responseObj.msg);
    return responseObj;
  },
  (error) => {
    if (error.response) {
      /* API-specific error handling */
      logger.debug("API specific error:", error.response.data.error);
      return Promise.reject(error.response.data.error);
    } else if (error.request) {
      /* Network error handling */
      logger.debug("Network specific error:", error);
    } else {
      /* Unknown error handling */
      logger.debug("Unknown error:", error);
    }
    return Promise.reject(error.message);
  }
);

/********************************************** Named export (ES module) **********************************************/
export { axiosInstance };
