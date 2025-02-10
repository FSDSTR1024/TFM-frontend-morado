/*********************************************** External Node modules ************************************************/
import { useState } from "react";

/********************************************** Internal library imports **********************************************/
import { Logger } from "/src/utils/Logger.js";
import { userAPI } from "/src/api";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("useRegister");

/************************************************** Hook Definition ***************************************************/
const useRegister = () => {
  const [error, setError] = useState(null);

  const registerConsumer = async (formData) => {
    setError(null);
    try {
      const { newConsumerID } = await userAPI.createConsumerUser(formData);
      return newConsumerID;
    } catch (error) {
      setError(error);
      const errorText = "Consumer user could not be created!";
      logger.error(errorText, error);
      return null;
    }
  };

  const registerRestaurant = async (formData) => {
    setError(null);
    try {
      const { newRestaurantID } = await userAPI.createRestaurantUser(formData);
      return newRestaurantID;
    } catch (error) {
      setError(error);
      const errorText = "Restaurant user could not be created!";
      logger.error(errorText, error);
      return null;
    }
  };

  return { error, registerConsumer, registerRestaurant };
};

/********************************************** Named export (ES module) **********************************************/
export { useRegister };
