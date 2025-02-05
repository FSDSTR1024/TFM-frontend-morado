/************************************************ Node modules needed *************************************************/
import { NavLink } from "react-router-dom";

/************************************************ Component Definition ************************************************/
const NavBar = () => (
  <nav className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal gap-2">
      <li>
        <NavLink className="text-base" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="text-base" to="/dishes">
          Dishes
        </NavLink>
      </li>
      <li>
        <NavLink className="text-base" to="/restaurants">
          Restaurants
        </NavLink>
      </li>
      <li>
        <NavLink className="text-base" to="/users">
          Users
        </NavLink>
      </li>
    </ul>
  </nav>
);

/********************************************** Named export (ES module) **********************************************/
export { NavBar };
