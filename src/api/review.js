/********************************************** Internal library imports **********************************************/
import { axiosInstance } from "./axios.js";

/************************************************** Dish APIs object **************************************************/
const reviewAPI = {
  getDishReviews: async (dishId) => await axiosInstance.get(`/reviews/byDish/${dishId}`),
  getRestaurantReviews: async (restaurantId) => await axiosInstance.get(`/reviews/byRestaurant/${restaurantId}`),
  getReviewsMadeByConsumer: async (consumerId) => await axiosInstance.get(`/reviews/byConsumer/${consumerId}`)
};

/********************************************* Named exports (ES module) **********************************************/
export { reviewAPI };
