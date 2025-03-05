/************************************************ Node modules needed *************************************************/
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { AuthContext } from "/src/contexts";
import { NotificationsButton } from "/src/components/molecules";
import { ProfilePic } from "/src/components/atoms";

/************************************************ Component Definition ************************************************/
const AuthBtns = () => {
  const { loggedUser } = useContext(AuthContext);

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
    <NotificationsButton key="NotificationsBtn" />,
    <ProfilePic key="ProfilePic" />
  ];

  const [authBtns, setAuthBtns] = useState(loggedUser ? loggedBtns : unloggedBtns);
  useEffect(() => {
    setAuthBtns(loggedUser ? loggedBtns : unloggedBtns);
  }, [loggedUser]);

  return (
    <div className="navbar-end mr-2">
      {authBtns.map((btn, index) => (
        <div className="ml-3" key={index}>
          {btn}
        </div>
      ))}
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { AuthBtns };
