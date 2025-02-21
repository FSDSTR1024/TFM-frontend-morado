/************************************************ Node modules needed *************************************************/
import { axiosInstance } from "./axios.js";

/************************************************** User APIs object **************************************************/
const userAPI = {
  createConsumer: async (formData) => await axiosInstance.post("/users/consumers", formData),
  createRestaurant: async (formData) => await axiosInstance.post("/users/restaurants", formData),
  getAllConsumers: async () => await axiosInstance.get("/users/consumers"),
  getLoggedUser: async () => await axiosInstance.get("/user")
};

/********************************************* Named exports (ES module) **********************************************/
export { userAPI };
