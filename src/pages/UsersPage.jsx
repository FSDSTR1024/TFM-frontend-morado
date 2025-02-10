/*********************************************** External Node modules ************************************************/
import { useEffect, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { ConsumerCard } from "/src/components/atoms";
import { Logger } from "/src/utils/Logger.js";
import { userAPI } from "/src/api";
import { useCards } from "/src/hooks";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("UsersPage");

/**************************************************** Page Content ****************************************************/
const UsersPage = () => {
  const [consumers, setConsumers] = useState([]);
  const { getNewestItem, getSortedItems } = useCards();
  const [newestConsumer, setNewestConsumer] = useState(null);
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("DESC");

  useEffect(() => {
    const getAllConsumers = async () => {
      try {
        const { allConsumers } = await userAPI.getAllConsumers();
        setNewestConsumer(getNewestItem(allConsumers));
        setConsumers(getSortedItems({
          itemsList: allConsumers,
          sortKey: sortKey,
          sortOrder: sortOrder
        }));
      } catch (error) {
        setConsumers([]);
        const errorText = "There was an error while trying to fetch all Consumer users!";
        logger.error(errorText, error);
      }
    };

    getAllConsumers();
  }, []);

  return (
    <section className="p-6 bg-base-200 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Nyam! Consumers</h1>
        <p className="text-lg text-gray-600">The amazing community members</p>
      </div>
      <div className="flex flex-wrap justify-center gap-10">
        {consumers && consumers.map((consumer) => <ConsumerCard key={consumer._id} latest={consumer === newestConsumer} {...consumer} />)}
      </div>
    </section>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { UsersPage };
