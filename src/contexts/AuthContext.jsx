/************************************************ Node modules needed *************************************************/
import { createContext, useCallback, useEffect, useState } from "react";

const initialContext = {
  loggedUser: null,
  setToken: () => "Out of context"
};

const AuthContext = createContext(initialContext);

const AuthContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(initialContext.loggedUser);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchUser = useCallback(async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const json = await response.json();
    if (!json.error) {
      setLoggedUser(json.data);
    } else {
      setLoggedUser(null);
      setToken(null);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchUser();
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const valueObj = { loggedUser, setToken };
  return <AuthContext.Provider value={{ ...valueObj }}>{children}</AuthContext.Provider>;
};

/********************************************** Named export (ES module) **********************************************/
export { AuthContext, AuthContextProvider };
