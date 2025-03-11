/*********************************************** External Node modules ************************************************/
import { useEffect, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { CardsDisplay } from "/src/components/templates";
import { ConsumerCard } from "/src/components/atoms";
import { Logger } from "/src/utils";
import { userAPI } from "/src/api";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("ConsumersPage");

/**************************************************** Page Content ****************************************************/
const ConsumersPage = () => {
  const [allConsumers, setAllConsumers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getConsumers = async () => {
      try {
        const { allConsumers } = await userAPI.getAllConsumers();
        setAllConsumers(allConsumers);
        setIsLoading(false);
      } catch (error) {
        setAllConsumers([]);
        const errorText = "There was an error while trying to fetch all Consumer users!";
        logger.error(errorText, error);
      }
    };

    getConsumers();
  }, []);

  const [nameFilter, setNameFilter] = useState("");
  const [surnameFilter, setSurnameFilter] = useState("");
  const filterMethod = (consumer) => {
    const nameMatches = consumer.name.toLowerCase().includes(nameFilter.toLowerCase());
    const surnameMatches = consumer.surname.toLowerCase().includes(surnameFilter.toLowerCase());
    return nameMatches && surnameMatches;
  };
  const cardProperties = [
    { text: "Antiquity", value: "createdAt" },
    // { text: "Email", value: "email" },
    {
      filter: {
        inputType: "text",
        onChangeMethod: (event) => setNameFilter(event.target.value),
        value: nameFilter
      },
      text: "Name",
      value: "name"
    },
    { text: "Reviews", value: "nrOfReviews" },
    {
      filter: {
        inputType: "text",
        onChangeMethod: (event) => setSurnameFilter(event.target.value),
        value: surnameFilter
      },
      text: "Surname",
      value: "surname"
    },
    { text: "Visited Restaurants", value: "nrOfVisitedRestaurants" }
  ];

  return (
    <CardsDisplay
      CardComponent={ConsumerCard}
      cardProperties={cardProperties}
      filterMethod={filterMethod}
      headerSubtitle="The amazing community members"
      headerTitle="Nyam! Consumers"
      isLoading={isLoading}
      itemsKind="consumer users"
      itemsList={allConsumers}
    />
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ConsumersPage };
