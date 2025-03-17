/*********************************************** External Node modules ************************************************/
import { useParams } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { DishProfile } from "/src/components/molecules";

/**************************************************** Page Content ****************************************************/
const SpecificDishPage = () => {
  const { dishId } = useParams();
  return <DishProfile dishId={dishId}/>
};

/********************************************** Named export (ES module) **********************************************/
export { SpecificDishPage };
