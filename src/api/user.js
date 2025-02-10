/************************************************ Node modules needed *************************************************/
import { axiosInstance } from "./axios.js";

const userAPI = {
  createConsumerUser: async (formData) => await axiosInstance.post("/users/consumers", formData),
  createRestaurantUser: async (formData) => await axiosInstance.post("/users/restaurants", formData),
  getLoggedUser: async () => await axiosInstance.get("/user")
};

/********************************************* Named exports (ES module) **********************************************/
export { userAPI };
