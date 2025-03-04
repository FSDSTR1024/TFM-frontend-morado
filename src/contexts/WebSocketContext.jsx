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
  wsOnlineConsumers: [],
  wsOnlineRestaurants: [],
};

/************************************************** Context creation **************************************************/
const WebSocketContext = createContext(initialContext);

/************************************************** Context provider **************************************************/
const WebSocketContextProvider = ({ children }) => {
  const { loggedUser } = useContext(AuthContext);

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

  useEffect(() => {
    const { socket } = getSocket();

    const onConnect = () => {
      logger.debug(`(${socket.id}) Connected to a websocket server.`);
      setWsIsConnected(true);
      LoginUser();
    };
    const onDisconnect = () => {
      logger.debug(`(${socket.id}) Disconnected from the websocket server.`);
      setWsIsConnected(false);
    };
    const onUpdateOnlineUsers = ({ onlineUsers }) => {
      logger.debug(`(${socket.id}) Updating the online users list:`, onlineUsers);
      setWsOnlineConsumers(onlineUsers.filter((user) => user.role === "consumers"));
      setWsOnlineRestaurants(onlineUsers.filter((user) => user.role === "restaurants"));
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("update online users", onUpdateOnlineUsers);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("update online users", onUpdateOnlineUsers);
    };
  }, []);

  useEffect(() => {
    LoginUser();
  }, [loggedUser]);

  const valueObj = { wsGetOnlineUsers, wsIsConnected, wsOnlineConsumers, wsOnlineRestaurants };
  return <WebSocketContext.Provider value={{ ...valueObj }}>{children}</WebSocketContext.Provider>;
};

/********************************************** Named export (ES module) **********************************************/
export { WebSocketContext, WebSocketContextProvider };
