/*********************************************** External Node modules ************************************************/
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { Logger } from "/src/utils";
import { userAPI } from "../api/user";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("UserActivationPage");

/**************************************************** Page Content ****************************************************/
const UserActivationPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async ({ userKind, userId }) => {
      try {
        if (userKind === "consumers") {
          const { consumer } = await userAPI.getConsumerById(userId);
          setUser(consumer);
        } else if (userKind === "restaurants") {
          const { restaurant } = await userAPI.getRestaurantById(userId);
          setUser(restaurant);
        }
      } catch (error) {
        setUser(null);
        const errorText = "There was an error while trying to fetch the user!";
        logger.error(errorText, error);
        navigate("/");
        document.getElementById("on_user_invalid_activation_modal").showModal();
      }
    };

    getUser(params);
  }, []);

  useEffect(() => {
    if (user !== null) {
      const status = searchParams.get("status");
      let modalId;
      switch (status) {
        case user.activation_code:
          modalId = "on_user_valid_activation_modal";
          break;
        case "DONE":
          modalId = "on_user_previous_activation_modal";
          break;
        case "INVALID":
          modalId = "on_user_invalid_activation_modal";
          break;
        default:
          modalId = "on_user_invalid_activation_modal";
          break;
      }
      navigate("/");
      document.getElementById(modalId).showModal();
    }
  }, [user]);

  return null;
};

/********************************************** Named export (ES module) **********************************************/
export { UserActivationPage };
