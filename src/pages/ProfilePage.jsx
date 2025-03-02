/*********************************************** External Node modules ************************************************/
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

/********************************************** Internal library imports **********************************************/
import { ConsumerProfile, RestaurantProfile } from "/src/components/molecules";

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
    ((location.state.loggedUser.role === "consumers" && <ConsumerProfile />) ||
      (location.state.loggedUser.role === "restaurants" && <RestaurantProfile />))
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ProfilePage };
