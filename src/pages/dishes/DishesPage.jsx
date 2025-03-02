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

  useEffect(() => {
    const getDishes = async () => {
      try {
        const { allDishes } = await dishAPI.getAllDishes();
        setAllDishes(allDishes);
      } catch (error) {
        setAllDishes([]);
        const errorText = "There was an error while trying to fetch all food Dishes!";
        logger.error(errorText, error);
      }
    };

    getDishes();
  }, []);

  const [nameFilter, setNameFilter] = useState("");
  const filterMethod = (dish) => {
    const nameMatches = dish.name.toLowerCase().includes(nameFilter.toLowerCase());
    return nameMatches;
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
    { text: "Reviews", value: "nrOfReviews" }
  ];

  return (
    <CardsDisplay
      CardComponent={DishCard}
      cardProperties={cardProperties}
      filterMethod={filterMethod}
      headerSubtitle="Find the perfect food plate to satisfy your cravings"
      headerTitle="Nyam! Dishes"
      itemsList={allDishes}
    />
  );
};

/********************************************** Named export (ES module) **********************************************/
export { DishesPage };
