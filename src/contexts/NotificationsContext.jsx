/************************************************ Node modules needed *************************************************/
import { createContext, useCallback, useContext, useEffect, useState } from "react";

/************************************************* Internal libraries *************************************************/
import { AuthContext } from "/src/contexts";
import { userAPI } from "../api/user";

/*********************************************** Initial context object ***********************************************/
const initialContext = {
  deleteNotification: () => "Out of context",
  notifications: [],
  refresh: () => "Out of context"
};

/************************************************** Context creation **************************************************/
const NotificationsContext = createContext(initialContext);

/************************************************** Context provider **************************************************/
const NotificationsContextProvider = ({ children }) => {
  const { loggedUser, refresh: refreshAuth } = useContext(AuthContext);
  const [state, refresh] = useState(false);

  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    if (loggedUser) {
      setNotifications(loggedUser.notifications);
    }
  }, [loggedUser]);

  useEffect(() => {
    refreshAuth((prevState) => !prevState);
  }, [state]);

  const deleteNotification = useCallback(async (notificationHash) => {
    const updatedNotifications = notifications.filter((notification) => notification.hash !== notificationHash);
    await userAPI.updateUserNotifications({ ...loggedUser, notifications: updatedNotifications });
  }, [loggedUser, notifications]);

  const valueObj = { deleteNotification, notifications, refresh };
  return <NotificationsContext.Provider value={{ ...valueObj }}>{children}</NotificationsContext.Provider>;
};

/********************************************** Named export (ES module) **********************************************/
export { NotificationsContext, NotificationsContextProvider };
