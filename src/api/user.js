/************************************************ Node modules needed *************************************************/
import { axiosInstance } from "./axios.js";

/************************************************** User APIs object **************************************************/
const userAPI = {
  createConsumer: async (formData) => await axiosInstance.post("/users/consumers", formData),
  createRestaurant: async (formData) => await axiosInstance.post("/users/restaurants", formData),
  getAllConsumers: async () => await axiosInstance.get("/users/consumers"),
  getAllRestaurants: async () => await axiosInstance.get("/users/restaurants"),
  getLoggedUser: async () => await axiosInstance.get("/user"),
  getRestaurantById: async ({ restaurantId }) => await axiosInstance.get(`/users/restaurants/${restaurantId}`)
};

/********************************************* Named exports (ES module) **********************************************/
export { userAPI };
