/*********************************************** External Node modules ************************************************/
import { useEffect, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { CardsDisplay } from "/src/components/templates";
import { dishAPI } from "/src/api";
import { DishCard } from "/src/components/atoms";
import { Logger } from "/src/utils";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("DishesPage");

/**************************************************** Page Content ****************************************************/
const DishesPage = () => {
  const [allDishes, setAllDishes] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getDishes = async () => {
      try {
        const { allDishes } = await dishAPI.getAllDishes();
        setAllDishes(allDishes);
        setIsLoading(false);
      } catch (error) {
        setAllDishes([]);
        const errorText = "There was an error while trying to fetch all food Dishes!";
        logger.error(errorText, error);
      }
    };

    getDishes();
  }, []);

  const [nameFilter, setNameFilter] = useState("");
  const [restaurantFilter, setRestaurantFilter] = useState("");
  const filterMethod = (dish) => {
    const nameMatches = dish.name.toLowerCase().includes(nameFilter.toLowerCase());
    const restaurantMatches = dish.restaurant.name.toLowerCase().includes(restaurantFilter.toLowerCase());
    return nameMatches && restaurantMatches;
  };
  const cardProperties = [
    { text: "Antiquity", value: "createdAt" },
    {
      filter: {
        inputType: "text",
        onChangeMethod: (event) => setNameFilter(event.target.value),
        value: nameFilter
      },
      text: "Name",
      value: "name"
    },
    { text: "Price", value: "price" },
    { text: "Rating", value: "rating" },
    {
      filter: {
        inputType: "text",
        onChangeMethod: (event) => setRestaurantFilter(event.target.value),
        value: restaurantFilter
      },
      text: "Restaurant",
      value: "restaurant.name"
    },
    { text: "Reviews", value: "nrOfReviews" }
  ];

  return (
    <CardsDisplay
      CardComponent={DishCard}
      cardProperties={cardProperties}
      filterMethod={filterMethod}
      headerSubtitle="Find the perfect food plate to satisfy your cravings"
      headerTitle="Nyam! Dishes"
      isLoading={isLoading}
      itemsKind="food dishes"
      itemsList={allDishes}
    />
  );
};

/********************************************** Named export (ES module) **********************************************/
export { DishesPage };
