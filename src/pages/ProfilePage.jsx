/*********************************************** External Node modules ************************************************/
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

/********************************************** Internal library imports **********************************************/

/**************************************************** Page Content ****************************************************/
const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.loggedUser) {
      navigate("/");
    }
  }, [location]);

  return (
    location.state?.loggedUser &&
    ((location.state.loggedUser.role === "consumers" && (
      <div>
        <h1>Consumers Profile Page</h1>
      </div>
    )) ||
      (location.state.loggedUser.role === "restaurants" && (
        <div>
          <h1>Restaurants Profile Page</h1>
        </div>
      )))
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ProfilePage };
