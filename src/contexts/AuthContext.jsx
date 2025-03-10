/************************************************ Node modules needed *************************************************/
import { createContext, useEffect, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { Logger } from "/src/utils";
import { userAPI } from "/src/api";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("AuthContext");

/*********************************************** Initial context object ***********************************************/
const initialContext = {
  loggedUser: null,
  refresh: () => "Out of context",
  setToken: () => "Out of context"
};

/************************************************** Context creation **************************************************/
const AuthContext = createContext(initialContext);

/************************************************** Context provider **************************************************/
const AuthContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(initialContext.loggedUser);
  const [state, refresh] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const getLoggedUser = async () => {
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
      getLoggedUser();
    } else {
      localStorage.removeItem("token");
      setLoggedUser(null);
    }
  }, [state, token]);

  const valueObj = { loggedUser, refresh, setToken };
  return <AuthContext.Provider value={{ ...valueObj }}>{children}</AuthContext.Provider>;
};

/********************************************** Named export (ES module) **********************************************/
export { AuthContext, AuthContextProvider };
