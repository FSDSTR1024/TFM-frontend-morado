/************************************************ Node modules needed *************************************************/
import { axiosInstance } from "./axios.js";

/************************************************** User APIs object **************************************************/
const userAPI = {
  createConsumer: async (formData) => await axiosInstance.post("/users/consumers", formData),
  createRestaurant: async (formData) => await axiosInstance.post("/users/restaurants", formData),
  getAllConsumers: async () => await axiosInstance.get("/users/consumers"),
  getAllRestaurants: async () => await axiosInstance.get("/users/restaurants"),
  getLoggedUser: async () => await axiosInstance.get("/user"),
  getRestaurantById: async (restaurantId) => await axiosInstance.get(`/users/restaurants/${restaurantId}`),
  updateProfile: async ({ formData, loggedUser }) => {
    const newUserData = {
      email: loggedUser.email,
      password: loggedUser.password,
      ...formData
    }
    const route = `/users/${loggedUser.role}/${loggedUser._id}`
    await axiosInstance.put(route, newUserData);
  },
  updateProfilePicture: async ({ _id, img_url, role }) => await axiosInstance.patch(`/users/${role}/${_id}/img_url`, { img_url })
};

/********************************************* Named exports (ES module) **********************************************/
export { userAPI };
