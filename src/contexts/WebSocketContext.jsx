/************************************************ Node modules needed *************************************************/
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { AuthContext } from "/src/contexts";
import { Logger } from "/src/utils";
import { socket } from "/src/config";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("WebSocketContext");

/*********************************************** Initial context object ***********************************************/
const initialContext = {
  isConnected: false,
  socket: null
};

/************************************************** Context creation **************************************************/
const WebSocketContext = createContext(initialContext);

/************************************************** Context provider **************************************************/
const WebSocketContextProvider = ({ children }) => {
  const { loggedUser } = useContext(AuthContext);

  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef();

  const loginUser = useCallback(() => {
    if (loggedUser) {
      socketRef.current.emit("login", { loggedUser });
    }
  }, [loggedUser]);

  useEffect(() => {
    logger.debug("----------------------> Mounting WebSocketContextProvider");
    socketRef.current = socket;

    const onConnect = () => {
      setIsConnected(true);
      loginUser();
    };
    const onDisconnect = () => {
      setIsConnected(false);
    };

    socketRef.current.on("connect", onConnect);
    socketRef.current.on("disconnect", onDisconnect);

    return () => {
      socketRef.current.off("connect", onConnect);
      socketRef.current.off("disconnect", onDisconnect);
    };
  });

  useEffect(() => {
    loginUser();
  }, [loggedUser]);

  const valueObj = { isConnected, socket: socketRef.current };
  return <WebSocketContext.Provider value={{ ...valueObj }}>{children}</WebSocketContext.Provider>;
};

/********************************************** Named export (ES module) **********************************************/
export { WebSocketContext, WebSocketContextProvider };
