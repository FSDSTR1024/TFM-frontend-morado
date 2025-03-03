/*********************************************** External Node modules ************************************************/
import { useContext, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { authAPI } from "/src/api";
import { AuthContext } from "/src/contexts";
import { Logger } from "/src/utils";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("useLogin");

/************************************************** Hook Definition ***************************************************/
const useLogin = () => {
  const [error, setError] = useState(null);
  const { setToken } = useContext(AuthContext);

  const login = async (credentials) => {
    setError(null);
    try {
      const token = await authAPI.login(credentials);
      setToken(token);
      return token;
    } catch (error) {
      setError(error);
      setToken(null);
      const errorText = "There was an error while trying to log in!";
      logger.error(errorText, error);
      return null;
    }
  };

  return { error, login };
};

/********************************************** Named export (ES module) **********************************************/
export { useLogin };
