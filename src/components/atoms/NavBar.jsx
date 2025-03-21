/************************************************ Node modules needed *************************************************/
import { NavLink } from "react-router-dom";

/************************************************ Component Definition ************************************************/
const NavBar = () => (
  <nav className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal gap-5 flex items-center">
      <li>
        <NavLink to="/">
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </NavLink>
      </li>
      <li>
        <NavLink className="text-lg" to="/consumers">
          Consumers
        </NavLink>
      </li>
      <li>
        <NavLink className="text-lg" to="/dishes">
          Dishes
        </NavLink>
      </li>
      <li>
        <NavLink className="text-lg" to="/restaurants">
          Restaurants
        </NavLink>
      </li>
    </ul>
  </nav>
);

/********************************************** Named export (ES module) **********************************************/
export { NavBar };
