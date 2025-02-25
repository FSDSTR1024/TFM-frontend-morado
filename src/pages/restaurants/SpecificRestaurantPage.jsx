/*********************************************** External Node modules ************************************************/
import { useParams } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { Logger } from "/src/utils";
import { userAPI } from "/src/api";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("SpecificRestaurantPage");

/**************************************************** Page Content ****************************************************/
const SpecificRestaurantPage = () => {
  const { restaurantId } = useParams();

  return (
    <div>
      <h1>Specific Restaurant Page</h1>
      <p>Restaurant ID: {restaurantId}</p>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { SpecificRestaurantPage };

