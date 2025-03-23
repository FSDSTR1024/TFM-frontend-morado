/********************************************** Internal library imports **********************************************/
import { axiosInstance } from "./axios.js";

/************************************************** User APIs object **************************************************/
const userAPI = {
  createConsumer: async (formData) => await axiosInstance.post("/users/consumers", formData),
  createRestaurant: async (formData) => await axiosInstance.post("/users/restaurants", formData),
  deleteUser: async (userId, userRole) => await axiosInstance.delete(`/users/${userRole}/${userId}`),
  followRestaurant: async ({ restaurantId, currentFollowers, newFollower }) => await axiosInstance.patch(`/users/restaurants/${restaurantId}/followers`, { followers: [...currentFollowers, newFollower] }),
  getAllConsumers: async () => await axiosInstance.get("/users/consumers"),
  getAllRestaurants: async () => await axiosInstance.get("/users/restaurants"),
  getConsumerById: async (consumerId) => await axiosInstance.get(`/users/consumers/${consumerId}`),
  getLoggedUser: async () => await axiosInstance.get("/user"),
  getRestaurantById: async (restaurantId) => await axiosInstance.get(`/users/restaurants/${restaurantId}`),
  unfollowRestaurant: async ({ restaurantId, currentFollowers, dropFollower }) => await axiosInstance.patch(`/users/restaurants/${restaurantId}/followers`, { followers: currentFollowers.filter((follower) => follower._id !== dropFollower._id) }),
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
