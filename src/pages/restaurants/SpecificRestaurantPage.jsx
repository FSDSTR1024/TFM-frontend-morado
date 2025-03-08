/*********************************************** External Node modules ************************************************/
import { useParams } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { RestaurantProfile } from "/src/components/molecules";

/**************************************************** Page Content ****************************************************/
const SpecificRestaurantPage = () => {
  const { restaurantId } = useParams();
  return <RestaurantProfile restaurantId={restaurantId}/>
};

/********************************************** Named export (ES module) **********************************************/
export { SpecificRestaurantPage };
