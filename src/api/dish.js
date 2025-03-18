/********************************************** Internal library imports **********************************************/
import { axiosInstance } from "./axios.js";

/************************************************** Dish APIs object **************************************************/
const dishAPI = {
  createDish: async (formData) => await axiosInstance.post("/dishes", formData),
  deleteDish: async (dishId) => await axiosInstance.delete(`/dishes/${dishId}`),
  getAllDishes: async () => await axiosInstance.get("/dishes"),
  getDishById: async (dishId) => await axiosInstance.get(`/dishes/${dishId}`),
  getDishesByRestaurantId: async (restaurantId) => await axiosInstance.get(`/dishes/byRestaurant/${restaurantId}`),
  updateProfilePicture: async ({ dishId, img_url }) => await axiosInstance.patch(`/dishes/${dishId}/img_url`, { img_url })
};

/********************************************* Named exports (ES module) **********************************************/
export { dishAPI };
