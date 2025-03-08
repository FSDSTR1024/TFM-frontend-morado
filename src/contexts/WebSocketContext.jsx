/************************************************ Node modules needed *************************************************/
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { AuthContext } from "/src/contexts";
import { Logger } from "/src/utils";
import { websocket } from "/src/config";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("WebSocketContext");

/*********************************************** Initial context object ***********************************************/
const initialContext = {
  wsGetOnlineUsers: () => "Out of context",
  wsIsConnected: false,
  wsLogoutUser: () => "Out of context",
  wsOnlineConsumers: [],
  wsOnlineRestaurants: [],
  wsUpdateUserProfile: () => "Out of context"
};

/************************************************** Context creation **************************************************/
const WebSocketContext = createContext(initialContext);

/************************************************** Context provider **************************************************/
const WebSocketContextProvider = ({ children }) => {
  const { loggedUser, refresh } = useContext(AuthContext);

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
      refresh((prevState) => !prevState);
      LoginUser();
    };
    const onDisconnect = () => {
      logger.debug(`(${socket.id}) Disconnected from the websocket server.`);
      setWsIsConnected(false);
    };

    const onReloadLoggedUser = () => {
      refresh((prevState) => !prevState);
    };

    const onUpdateOnlineUsers = ({ onlineUsers }) => {
      logger.debug(`(${socket.id}) Updating the online users list:`, onlineUsers);
      setWsOnlineConsumers(onlineUsers.filter((user) => user.role === "consumers"));
      setWsOnlineRestaurants(onlineUsers.filter((user) => user.role === "restaurants"));
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("reload logged user", onReloadLoggedUser);
    socket.on("update online users", onUpdateOnlineUsers);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("reload logged user", onReloadLoggedUser);
      socket.off("update online users", onUpdateOnlineUsers);
    };
  }, []);

  useEffect(() => {
    LoginUser();
  }, [loggedUser]);

  const valueObj = {
    wsGetOnlineUsers,
    wsIsConnected,
    wsLogoutUser,
    wsOnlineConsumers,
    wsOnlineRestaurants,
    wsUpdateUserProfile
  };
  return <WebSocketContext.Provider value={{ ...valueObj }}>{children}</WebSocketContext.Provider>;
};

/********************************************** Named export (ES module) **********************************************/
export { WebSocketContext, WebSocketContextProvider };
