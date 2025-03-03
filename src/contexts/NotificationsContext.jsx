/************************************************ Node modules needed *************************************************/
import { createContext, useCallback, useEffect, useState } from "react";

/************************************************* Internal libraries *************************************************/
import { getSHA1Hash } from "/src/utils";

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
  const [toDeleteNotification, setToDeleteNotification] = useState(null);

  /* Use effect to initialize the notifications in the local storage */
  useEffect(() => {
    if (!localStorageNotifications) {
      localStorage.setItem("notifications", JSON.stringify([]));
    }
  }, []);

  /* Use effect to update the notifications when setNewNotification is called outside */
  useEffect(() => {
    const addNotification = async () => {
      const notificationHash = await getSHA1Hash(JSON.stringify(newNotification));
      const sortedNotifications = [...notifications, { ...newNotification, _id: notificationHash }].sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
      setNotifications(sortedNotifications);
    };

    if (newNotification) {
      setNewNotification(null);
      addNotification();
    }
  }, [newNotification]);

  /* Use effect to update the notifications when setToDeleteNotification is called outside */
  useEffect(() => {
    if (toDeleteNotification) {
      setToDeleteNotification(null);
      const updatedNotifications = notifications.filter((notification) => notification._id !== toDeleteNotification);
      const sortedNotifications = [...updatedNotifications].sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
      setNotifications(sortedNotifications);
    }
  }, [toDeleteNotification]);

  /* Use effect to update the local storage when notifications change */
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const valueObj = { notifications, setNewNotification, setToDeleteNotification };
  return <NotificationsContext.Provider value={{ ...valueObj }}>{children}</NotificationsContext.Provider>;
};

/********************************************** Named export (ES module) **********************************************/
export { NotificationsContext, NotificationsContextProvider };
