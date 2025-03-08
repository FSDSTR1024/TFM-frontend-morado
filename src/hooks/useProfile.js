/*********************************************** External Node modules ************************************************/
import { useCallback, useContext, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { AuthContext } from "/src/contexts";
import { Logger } from "/src/utils";
import { userAPI } from "/src/api";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("useProfile");

/************************************************** Hook Definition ***************************************************/
const useProfile = () => {
  const { loggedUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const updateConsumer = async (formData) => {
    setError(null);
  };

  const updateRestaurant = useCallback(async ({ formData }) => {
    setError(null);
    try {
      await userAPI.updateProfile({ formData, loggedUser });
    } catch (error) {
      setError(error);
      const errorText = "Restaurant user could not be updated!";
      logger.error(errorText, error);
      return error;
    }
  }, [loggedUser]);

  return { error, updateConsumer, updateRestaurant };
};

/********************************************** Named export (ES module) **********************************************/
export { useProfile };
