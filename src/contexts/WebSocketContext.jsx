/************************************************ Node modules needed *************************************************/
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { AuthContext, NotificationsContext } from "/src/contexts";
import { Logger } from "/src/utils";
import { websocket } from "/src/config";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("WebSocketContext");

/*********************************************** Initial context object ***********************************************/
const initialContext = {
  wsGetIsConnected: () => "Out of context",
  wsGetOnlineUsers: () => "Out of context",
  wsIsConnected: false,
  wsLogoutUser: () => "Out of context",
  wsNewDishAdded: () => "Out of context",
  wsNewFollowerAdded: () => "Out of context",
  wsOnlineConsumers: [],
  wsOnlineRestaurants: [],
  wsUpdateUserProfile: () => "Out of context"
};

/************************************************** Context creation **************************************************/
const WebSocketContext = createContext(initialContext);

/************************************************** Context provider **************************************************/
const WebSocketContextProvider = ({ children }) => {
  const { loggedUser, refresh: refreshAuth } = useContext(AuthContext);
  const { refresh: refreshNotis } = useContext(NotificationsContext);

  const [wsIsConnected, setWsIsConnected] = useState(initialContext.wsIsConnected);
  const [wsOnlineConsumers, setWsOnlineConsumers] = useState(initialContext.wsOnlineConsumers);
  const [wsOnlineRestaurants, setWsOnlineRestaurants] = useState(initialContext.wsOnlineRestaurants);
  const socketRef = useRef(null);

  /* Private methods */
  const getSocket = useCallback(() => {
    if (socketRef.current == null) {
      socketRef.current = websocket;
    }
    return { socket: socketRef.current };
  }, [socketRef]);

  const LoginUser = useCallback(() => {
    const { socket } = getSocket();
    if (loggedUser) {
      logger.debug(`(${socket.id}) Logging in the user "${loggedUser.email}".`);
      socket.emit("login", { loggedUser });
    }
  }, [loggedUser]);

  /* Public methods */
  const wsGetIsConnected = useCallback(() => {
    const { socket } = getSocket();
    logger.debug(`(${socket.id}) Asking if the websocket is still on live.`);
    socket.emit("get is connected");
  }, []);

  const wsGetOnlineUsers = useCallback(() => {
    const { socket } = getSocket();
    logger.debug(`(${socket.id}) Asking for the online users list.`);
    socket.emit("get online users");
  }, []);

  const wsLogoutUser = useCallback(() => {
    const { socket } = getSocket();
    if (loggedUser) {
      logger.debug(`(${socket.id}) Logging out the user "${loggedUser.email}".`);
      socket.emit("logout");
    }
  }, [loggedUser]);

  const wsNewDishAdded = useCallback(() => {
    const { socket } = getSocket();
    logger.debug(`(${socket.id}) A new dish has been added.`);
    socket.emit("new dish added");
  }, []);

  const wsNewFollowerAdded = useCallback(() => {
    const { socket } = getSocket();
    logger.debug(`(${socket.id}) A new follower has been added.`);
    socket.emit("new follower added");
  }, []);

  const wsUpdateUserProfile = useCallback(() => {
    const { socket } = getSocket();
    if (loggedUser) {
      logger.debug(`(${socket.id}) Changing the profile of the logged user "${loggedUser.email}".`);
      socket.emit("update profile");
    }
  }, [loggedUser]);

  useEffect(() => {
    const { socket } = getSocket();

    const onConnect = () => {
      logger.debug(`(${socket.id}) Connected to a websocket server.`);
      setWsIsConnected(true);
      refreshAuth((prevState) => !prevState);
      LoginUser();
    };
    const onDisconnect = () => {
      logger.debug(`(${socket.id}) Disconnected from the websocket server.`);
      setWsIsConnected(false);
    };

    const onIsConnected = () => {
      logger.debug(`(${socket.id}) Still connected to the websocket server.`);
      setWsIsConnected(true);
    };

    const onReloadLoggedUser = () => {
      refreshAuth((prevState) => !prevState);
    };

    const onUpdateNotifications = () => {
      logger.debug(`(${socket.id}) Updating the logged user notifications`);
      refreshNotis((prevState) => !prevState);
    };

    const onUpdateOnlineUsers = ({ onlineUsers }) => {
      logger.debug(`(${socket.id}) Updating the online users list:`, onlineUsers);
      setWsOnlineConsumers(onlineUsers.filter((user) => user.role === "consumers"));
      setWsOnlineRestaurants(onlineUsers.filter((user) => user.role === "restaurants"));
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("is connected", onIsConnected);
    socket.on("reload logged user", onReloadLoggedUser);
    socket.on("update notifications", onUpdateNotifications);
    socket.on("update online users", onUpdateOnlineUsers);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("is connected", onIsConnected);
      socket.off("reload logged user", onReloadLoggedUser);
      socket.off("update notifications", onUpdateNotifications);
      socket.off("update online users", onUpdateOnlineUsers);
    };
  }, []);

  useEffect(() => {
    LoginUser();
  }, [loggedUser]);

  const valueObj = {
    wsGetIsConnected,
    wsGetOnlineUsers,
    wsIsConnected,
    wsLogoutUser,
    wsNewDishAdded,
    wsNewFollowerAdded,
    wsOnlineConsumers,
    wsOnlineRestaurants,
    wsUpdateUserProfile
  };
  return <WebSocketContext.Provider value={{ ...valueObj }}>{children}</WebSocketContext.Provider>;
};

/********************************************** Named export (ES module) **********************************************/
export { WebSocketContext, WebSocketContextProvider };
