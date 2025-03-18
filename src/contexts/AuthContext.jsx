/************************************************ Node modules needed *************************************************/
import { createContext, useEffect, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { Logger } from "/src/utils";
import { reviewAPI, userAPI } from "/src/api";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("AuthContext");

/*********************************************** Initial context object ***********************************************/
const initialContext = {
  isConsumer: false,
  loggedUser: null,
  refresh: () => "Out of context",
  setToken: () => "Out of context",
  userReviews: []
};

/************************************************** Context creation **************************************************/
const AuthContext = createContext(initialContext);

/************************************************** Context provider **************************************************/
const AuthContextProvider = ({ children }) => {
  const [isConsumer, setIsConsumer] = useState(initialContext.isConsumer);
  const [loggedUser, setLoggedUser] = useState(initialContext.loggedUser);
  const [state, refresh] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userReviews, setUserReviews] = useState(initialContext.userReviews);

  useEffect(() => {
    const getConsumerReviews = async (consumerId) => {
      try {
        const { consumerReviews } = await reviewAPI.getReviewsMadeByConsumer(consumerId);
        setUserReviews(consumerReviews);
      } catch (error) {
        setUserReviews([]);
        const errorText = "There was an error while trying to fetch the user Reviews!";
        logger.error(errorText, error);
      }
    };

    const getLoggedUser = async () => {
      try {
        const { loggedUser } = await userAPI.getLoggedUser();
        setLoggedUser(loggedUser);
        if (loggedUser.role === "consumers") {
          setIsConsumer(true);
          getConsumerReviews(loggedUser._id);
        }
      } catch (error) {
        setIsConsumer(false);
        setLoggedUser(null);
        setToken(null);
        setUserReviews([]);
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

  const valueObj = { isConsumer, loggedUser, refresh, setToken, userReviews };
  return <AuthContext.Provider value={{ ...valueObj }}>{children}</AuthContext.Provider>;
};

/********************************************** Named export (ES module) **********************************************/
export { AuthContext, AuthContextProvider };
