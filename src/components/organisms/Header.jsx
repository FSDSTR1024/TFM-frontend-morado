/************************************************ Node modules needed *************************************************/
import { memo, useContext, useEffect, useState } from "react";

/************************************************* Internal libraries *************************************************/
import { AuthBtns } from "/src/components/molecules";
import { NavBar } from "/src/components/atoms";
import { WebSocketContext } from "/src/contexts";

/********************************************** Subcomponents Definition **********************************************/
const OfflineWsIcon = memo(() => (
  <div className="inline-grid *:[grid-area:1/1]">
    <div className="status status-error animate-bounce"></div>
    <div className="status status-error"></div>
  </div>
));
const OnlineWsIcon = memo(() => (
  <div className="inline-grid *:[grid-area:1/1]">
    <div className="status status-success animate-ping"></div>
    <div className="status status-success"></div>
  </div>
));

/************************************************ Component Definition ************************************************/
const Header = () => {
  const { wsGetIsConnected, wsIsConnected } = useContext(WebSocketContext);

  const [isConnected, setIsConnected] = useState(wsIsConnected);
  useEffect(() => {
    setIsConnected(wsIsConnected);
  }, [wsIsConnected]);

  /* Ask if the WebSocket is on live */
  useEffect(() => {
    wsGetIsConnected();
  }, [wsGetIsConnected]);

  return (
    <header className="navbar bg-base-100 flex justify-between items-center w-full sticky top-0 z-50 shadow-md">
      <div className="navbar-start flex items-center gap-3">
        <img
          alt="Nyam! application logo"
          className="h-14"
          src="https://static.vecteezy.com/system/resources/thumbnails/026/990/597/small_2x/one-continuous-line-drawing-of-knife-and-fork-with-ribbon-for-restaurant-logo-emblem-luxury-cafe-shop-logotype-template-concept-modern-single-line-draw-design-graphic-illustration-png.png"
        />
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Nyam!</h1>
            {isConnected ? <OnlineWsIcon /> : <OfflineWsIcon />}
          </div>
          <h2 className="text-sm font-light italic">Discover, Share, Enjoy!</h2>
        </div>
      </div>
      <NavBar />
      <AuthBtns />
    </header>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { Header };
