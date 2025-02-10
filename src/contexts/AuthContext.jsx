/************************************************ Node modules needed *************************************************/
import { createContext, useCallback, useEffect, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { Logger } from "/src/utils/Logger.js";
import { userAPI } from "/src/api";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("useLogin");

/*********************************************** Initial context object ***********************************************/
const initialContext = {
  loggedUser: null,
  setToken: () => "Out of context"
};

/************************************************** Context creation **************************************************/
const AuthContext = createContext(initialContext);

/************************************************** Context provider **************************************************/
const AuthContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(initialContext.loggedUser);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchLoggedUser = useCallback(async () => {
    try {
      const loggedUser = await userAPI.getLoggedUser();
      if (!loggedUser) {
        setLoggedUser(null);
        setToken(null);
        return;
      } else {
        setLoggedUser(loggedUser);
      }
    } catch (error) {
      setLoggedUser(null);
      setToken(null);
      const errorText = "There was an error while trying to fetch the logged user!";
      logger.error(errorText, error);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchLoggedUser();
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const valueObj = { loggedUser, setToken };
  return <AuthContext.Provider value={{ ...valueObj }}>{children}</AuthContext.Provider>;
};

/********************************************** Named export (ES module) **********************************************/
export { AuthContext, AuthContextProvider };
