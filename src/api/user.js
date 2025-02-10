/************************************************ Node modules needed *************************************************/
import { axiosInstance } from "./axios.js";

const userAPI = {
  getLoggedUser: async () => {
    const { loggedUser } = await axiosInstance.get("/user");
    return loggedUser;
  }
};

/********************************************* Named exports (ES module) **********************************************/
export { userAPI };
