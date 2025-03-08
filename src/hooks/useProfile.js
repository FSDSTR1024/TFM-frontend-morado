/*********************************************** External Node modules ************************************************/
import { useState } from "react";

/********************************************** Internal library imports **********************************************/
import { Logger } from "/src/utils";
import { userAPI } from "/src/api";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("useProfile");

/************************************************** Hook Definition ***************************************************/
const useProfile = () => {
  const [error, setError] = useState(null);

  const updateConsumer = async (formData) => {
    setError(null);
  };

  const updateRestaurant = async ({ formData, loggedUser }) => {
    setError(null);
    try {
      await userAPI.updateUser({ formData, loggedUser });
    } catch (error) {
      setError(error);
      const errorText = "Restaurant user could not be updated!";
      logger.error(errorText, error);
      return error;
    }
  };

  return { error, updateConsumer, updateRestaurant };
};

/********************************************** Named export (ES module) **********************************************/
export { useProfile };
