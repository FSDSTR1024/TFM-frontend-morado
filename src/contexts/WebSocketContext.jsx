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
      logger.debug(`(${socketRef.current.id}) Logging in the user "${loggedUser.email}".`);
      socketRef.current.emit("login", { loggedUser });
    }
  }, [loggedUser]);

  useEffect(() => {
    socketRef.current = socket;

    const onConnect = () => {
      logger.debug(`(${socketRef.current.id}) Connected to the websocket server.`);
      setIsConnected(true);
      loginUser();
    };
    const onDisconnect = () => {
      logger.debug(`(${socketRef.current.id}) Disconnected from the websocket server.`);
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
