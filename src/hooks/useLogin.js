/*********************************************** External Node modules ************************************************/
import { useState } from "react";

/********************************************** Internal library imports **********************************************/
import { authAPI } from "/src/api";
import { Logger } from "/src/utils/Logger.js";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("useLogin");

/************************************************** Hook Definition ***************************************************/
const useLogin = () => {
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      setError(null);
      const token = await authAPI.login(credentials);
      return token;
    } catch (error) {
      const errorText = "There was an error while trying to log in!";
      logger.error(errorText, error);
      setError(error);
      return null;
    }
  };

  return { error, login };
};

/********************************************** Named export (ES module) **********************************************/
export { useLogin };
