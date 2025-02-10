/************************************************ Node modules needed *************************************************/
import { axiosInstance } from "./axios.js";

const userAPI = {
  createConsumerUser: async (formData) => await axiosInstance.post("/users/consumers", formData),
  getLoggedUser: async () => await axiosInstance.get("/user")
};

/********************************************* Named exports (ES module) **********************************************/
export { userAPI };
