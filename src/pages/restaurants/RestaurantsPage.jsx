/*********************************************** External Node modules ************************************************/
import { useEffect, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { CardsDisplay } from "/src/components/templates";
import { Logger } from "/src/utils";
import { RestaurantCard } from "/src/components/atoms";
import { userAPI } from "/src/api";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("RestaurantsPage");

/**************************************************** Page Content ****************************************************/
const RestaurantsPage = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const { allRestaurants } = await userAPI.getAllRestaurants();
        setAllRestaurants(allRestaurants);
        setIsLoading(false);
      } catch (error) {
        setAllRestaurants([]);
        const errorText = "There was an error while trying to fetch all Restaurant users!";
        logger.error(errorText, error);
      }
    };

    getRestaurants();
  }, []);

  const [locationFilter, setLocationFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const filterMethod = (restaurant) => {
    const locationMatches = restaurant.location.toLowerCase().includes(locationFilter.toLowerCase());
    const nameMatches = restaurant.name.toLowerCase().includes(nameFilter.toLowerCase());
    return locationMatches && nameMatches;
  };
  const cardProperties = [
    { text: "Antiquity", value: "createdAt" },
    { text: "Dishes", value: "nrOfDishes" },
    // { text: "Email", value: "email" },
    {
      filter: {
        inputType: "text",
        onChangeMethod: (event) => setLocationFilter(event.target.value),
        value: locationFilter
      },
      text: "Location",
      value: "location"
    },
    {
      filter: {
        inputType: "text",
        onChangeMethod: (event) => setNameFilter(event.target.value),
        value: nameFilter
      },
      text: "Name",
      value: "name"
    },
    { text: "Phone", value: "phone" },
    { text: "Rating", value: "rating" },
    { text: "Reviews", value: "nrOfReviews" }
  ];

  return (
    <CardsDisplay
      CardComponent={RestaurantCard}
      cardProperties={cardProperties}
      filterMethod={filterMethod}
      headerSubtitle="Discover the best places to eat"
      headerTitle="Nyam! Restaurants"
      isLoading={isLoading}
      itemsKind="restaurant users"
      itemsList={allRestaurants}
    />
  );
};

/********************************************** Named export (ES module) **********************************************/
export { RestaurantsPage };
