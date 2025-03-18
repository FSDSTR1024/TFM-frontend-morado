/*********************************************** External Node modules ************************************************/
import { useState } from "react";

/********************************************** Internal library imports **********************************************/
import { dishAPI, reviewAPI, userAPI } from "/src/api";
import { Logger } from "/src/utils";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("useRegister");

/************************************************** Hook Definition ***************************************************/
const useRegister = () => {
  const [error, setError] = useState(null);

  const registerConsumer = async (formData) => {
    setError(null);
    try {
      const { newConsumerID } = await userAPI.createConsumer(formData);
      return newConsumerID;
    } catch (error) {
      setError(error);
      const errorText = "Consumer user could not be created!";
      logger.error(errorText, error);
      return null;
    }
  };

  const registerDish = async (formData) => {
    setError(null);
    try {
      const { newDishID } = await dishAPI.createDish(formData);
      return newDishID;
    } catch (error) {
      setError(error);
      const errorText = "Food dish could not be created!";
      logger.error(errorText, error);
      return null;
    }
  };

  const registerRestaurant = async (formData) => {
    setError(null);
    try {
      const { newRestaurantID } = await userAPI.createRestaurant(formData);
      return newRestaurantID;
    } catch (error) {
      setError(error);
      const errorText = "Restaurant user could not be created!";
      logger.error(errorText, error);
      return null;
    }
  };

  const registerReview = async (formData) => {
    setError(null);
    try {
      const { newReviewID } = await reviewAPI.createReview(formData);
      return newReviewID;
    } catch (error) {
      setError(error);
      const errorText = "Dish review could not be created!";
      logger.error(errorText, error);
      return null;
    }
  };

  return { error, registerConsumer, registerDish, registerRestaurant, registerReview };
};

/********************************************** Named export (ES module) **********************************************/
export { useRegister };
