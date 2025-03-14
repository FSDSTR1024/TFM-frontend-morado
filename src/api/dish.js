/********************************************** Internal library imports **********************************************/
import { axiosInstance } from "./axios.js";

/************************************************** Dish APIs object **************************************************/
const dishAPI = {
  createDish: async (formData) => await axiosInstance.post("/dishes", formData),
  deleteDish: async (dishId) => await axiosInstance.delete(`/dishes/${dishId}`),
  getAllDishes: async () => await axiosInstance.get("/dishes"),
  getDishesByRestaurantId: async (restaurantId) => await axiosInstance.get(`/dishes/byRestaurant/${restaurantId}`)
};

/********************************************* Named exports (ES module) **********************************************/
export { dishAPI };
