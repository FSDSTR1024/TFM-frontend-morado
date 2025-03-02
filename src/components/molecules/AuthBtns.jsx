/************************************************ Node modules needed *************************************************/
import { NavLink } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { ProfilePic } from "/src/components/atoms";

/************************************************ Component Definition ************************************************/
const AuthBtns = ({ loggedUser }) => {
  /* Buttons to display when user is not logged in */
  const unloggedBtns = [
    <NavLink className="btn btn-sm btn-outline btn-accent" key="registerPage" to="/register">
      Sign up
    </NavLink>,
    <NavLink className="btn btn-sm btn-outline btn-secondary" key="loginPage" to="/login">
      Login
    </NavLink>
  ];

  /* Buttons to display when user is logged in */
  const loggedBtns = [
    <ProfilePic key="ProfilePic" />
  ];

  const authBtns = loggedUser ? loggedBtns : unloggedBtns;
  return (
    <div className="navbar-end mr-1">
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
