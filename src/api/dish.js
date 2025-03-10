/************************************************ Node modules needed *************************************************/
import { axiosInstance } from "./axios.js";

/************************************************** Dish APIs object **************************************************/
const dishAPI = {
  getAllDishes: async () => await axiosInstance.get("/dishes"),
  getDishesByRestaurantId: async (restaurantId) => await axiosInstance.get(`/dishes/byRestaurant/${restaurantId}`)
};

/********************************************* Named exports (ES module) **********************************************/
export { dishAPI };
