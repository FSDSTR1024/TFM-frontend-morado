/************************************************ Node modules needed *************************************************/
import { axiosInstance } from "./axios.js";

/************************************ Authentication and Authorization APIs object ************************************/
const authAPI = {
  login: async ({ email, password }) => {
    const { token } = await axiosInstance.post("/users/login", { email, password });
    return token;
  }
};

/********************************************* Named exports (ES module) **********************************************/
export { authAPI };
