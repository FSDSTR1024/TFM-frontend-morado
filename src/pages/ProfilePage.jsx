/*********************************************** External Node modules ************************************************/
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { ConsumerProfile, RestaurantProfile } from "/src/components/molecules";

/**************************************************** Page Content ****************************************************/
const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state?.loggedUser) {
      navigate("/");
    }
  }, [location]);

  const [loggedUser, setLoggedUser] = useState(location?.state?.loggedUser);
  useEffect(() => {
    setLoggedUser(location?.state?.loggedUser);
  }, [location]);

  return (
    loggedUser &&
    ((loggedUser.role === "consumers" && <ConsumerProfile consumerId={loggedUser._id} />) ||
      (loggedUser.role === "restaurants" && <RestaurantProfile restaurantId={loggedUser._id}/>))
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ProfilePage };
