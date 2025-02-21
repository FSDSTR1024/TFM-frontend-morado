/*********************************************** External Node modules ************************************************/
import { useEffect, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { CardsDisplay } from "/src/components/templates";
import { ConsumerCard } from "/src/components/atoms";
import { Logger } from "/src/utils/Logger.js";
import { userAPI } from "/src/api";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("RestaurantsPage");

/**************************************************** Page Content ****************************************************/
const RestaurantsPage = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const { allRestaurants } = await userAPI.getAllRestaurants();
        setAllRestaurants(allRestaurants);
      } catch (error) {
        setAllRestaurants([]);
        const errorText = "There was an error while trying to fetch all Restaurant users!";
        logger.error(errorText, error);
      }
    };

    getRestaurants();
  }, []);

  // const [surnameFilter, setSurnameFilter] = useState("");
  const filterMethod = (restaurant) => {return true;};
  const cardProperties = [];

  return (
    <CardsDisplay
      CardComponent={ConsumerCard}
      cardProperties={cardProperties}
      filterMethod={filterMethod}
      headerSubtitle="The amazing community members"
      headerTitle="Nyam! Restaurants"
      itemsList={allRestaurants}
    />
  );
};

/********************************************** Named export (ES module) **********************************************/
export { RestaurantsPage };
