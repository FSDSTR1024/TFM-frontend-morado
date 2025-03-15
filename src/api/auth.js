/************************************************ Node modules needed *************************************************/
import { axiosInstance } from "./axios.js";

/************************************ Authentication and Authorization APIs object ************************************/
const authAPI = {
  login: async ({ email, password }) => {
    return await axiosInstance.post("/users/login", { email, password });
  }
};

/********************************************* Named exports (ES module) **********************************************/
export { authAPI };
