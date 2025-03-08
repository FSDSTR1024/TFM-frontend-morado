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

  const _updateUser = useCallback(async ({ formData, userKind }) => {
    setError(null);
    try {
      await userAPI.updateProfile({ formData, loggedUser });
    } catch (error) {
      setError(error);
      const errorText = `${userKind} user could not be updated!`;
      logger.error(errorText, error);
      return error;
    }
  }, [loggedUser]);

  const updateConsumer = useCallback(async ({ formData }) => _updateUser({ formData, userKind: "Consumer" }), []);
  const updateRestaurant = useCallback(async ({ formData }) => _updateUser({ formData, userKind: "Restaurant" }), []);

  return { error, updateConsumer, updateRestaurant };
};

/********************************************** Named export (ES module) **********************************************/
export { useProfile };
