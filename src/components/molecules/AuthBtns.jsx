/************************************************ Node modules needed *************************************************/
import { NavLink } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { LogoutButton } from "/src/components/atoms";

/************************************************ Component Definition ************************************************/
const AuthBtns = ({ loggedUser }) => {
  /* Buttons to display when user is not logged in */
  const unloggedBtns = [
    <NavLink className="btn btn-sm btn-outline btn-accent" key="register" to="/register">
      Sign up
    </NavLink>,
    <NavLink className="btn btn-sm btn-outline btn-secondary" key="login" to="/login">
      Login
    </NavLink>
  ];

  /* Buttons to display when user is logged in */
  const loggedBtns = [
    <NavLink className="btn btn-sm btn-outline btn-primary" key="profile" to="/profile">
      Profile
    </NavLink>,
    <LogoutButton key="logout" />
  ];

  const authBtns = loggedUser ? loggedBtns : unloggedBtns;
  return (
    <div className="navbar-end">
      {authBtns.map((btn, index) => (
        <div className="ml-2" key={index}>
          {btn}
        </div>
      ))}
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { AuthBtns };
