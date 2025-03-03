/************************************************ Node modules needed *************************************************/
import { createContext, useCallback, useEffect, useState } from "react";

/*********************************************** Initial context object ***********************************************/
const initialContext = {
  deleteAllNotifications: () => "Out of context",
  notifications: [],
  setNewNotification: () => "Out of context"
};

/************************************************** Context creation **************************************************/
const NotificationsContext = createContext(initialContext);

/************************************************** Context provider **************************************************/
const NotificationsContextProvider = ({ children }) => {
  const localStorageNotifications = localStorage.getItem("notifications");

  const [newNotification, setNewNotification] = useState(null);
  const [notifications, setNotifications] = useState(localStorageNotifications ? JSON.parse(localStorageNotifications) : []);

  /* Use effect to initialize the notifications in the local storage */
  useEffect(() => {
    if (!localStorageNotifications) {
      localStorage.setItem("notifications", JSON.stringify([]));
    }
  }, []);

  /* Use effect to update the notifications when setNewNotification is called outside */
  useEffect(() => {
    if (newNotification) {
      console.log("New notification: ", newNotification);
      setNewNotification(null);
      setNotifications([...notifications, newNotification]);
    }
  }, [newNotification]);

  /* Use effect to update the local storage when notifications change */
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const deleteAllNotifications = useCallback(() => {
    console.log("All notifications deleted!");
    // setNotifications([]);
  }, []);

  const valueObj = { deleteAllNotifications, notifications, setNewNotification };
  return <NotificationsContext.Provider value={{ ...valueObj }}>{children}</NotificationsContext.Provider>;
};

/********************************************** Named export (ES module) **********************************************/
export { NotificationsContext, NotificationsContextProvider };
