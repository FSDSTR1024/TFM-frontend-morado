/************************************************ Node modules needed *************************************************/
import { createContext, useEffect, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { Logger } from "/src/utils/Logger.js";
import { userAPI } from "/src/api";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("AuthContext");

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

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const { loggedUser } = await userAPI.getLoggedUser();
        setLoggedUser(loggedUser);
      } catch (error) {
        setLoggedUser(null);
        setToken(null);
        const errorText = "There was an error while trying to fetch the logged user!";
        logger.error(errorText, error);
      }
    }

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
