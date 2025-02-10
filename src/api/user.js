/************************************************ Node modules needed *************************************************/
import { axiosInstance } from "./axios.js";

const userAPI = {
  createConsumer: async (formData) => await axiosInstance.post("/users/consumers", formData),
  createRestaurant: async (formData) => await axiosInstance.post("/users/restaurants", formData),
  getLoggedUser: async () => await axiosInstance.get("/user")
};

/********************************************* Named exports (ES module) **********************************************/
export { userAPI };
