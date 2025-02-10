/************************************************ Node modules needed *************************************************/
import { useContext } from "react";

/************************************************* Internal libraries *************************************************/
import { AuthBtns } from "/src/components/molecules";
import { AuthContext } from "/src/contexts/AuthContext";
import { NavBar } from "/src/components/atoms";

/************************************************ Component Definition ************************************************/
const Header = () => {
  const { loggedUser } = useContext(AuthContext);

  return (
    <header className="navbar bg-base-100 flex justify-between items-center w-full sticky top-0 z-50 shadow-md">
      <div className="navbar-start flex items-center gap-3">
        <img
          alt="Nyam! application logo"
          className="h-14"
          src="https://static.vecteezy.com/system/resources/thumbnails/026/990/597/small_2x/one-continuous-line-drawing-of-knife-and-fork-with-ribbon-for-restaurant-logo-emblem-luxury-cafe-shop-logotype-template-concept-modern-single-line-draw-design-graphic-illustration-png.png"
        />
        {/* <h2>Some slogan here?</h2> */}
        <div>
          <h1 className="text-2xl font-bold">Nyam!</h1>
          <h2 className="text-sm font-light italic">Discover, Share, Enjoy!</h2>
        </div>
      </div>
      <NavBar />
      <AuthBtns loggedUser={loggedUser} />
    </header>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { Header };
