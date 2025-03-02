/*********************************************** External Node modules ************************************************/
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { dishAPI, userAPI } from "/src/api";
import { DishCard, Loading, StarRating } from "/src/components/atoms";
import { getUserImgURL, Logger } from "/src/utils";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("SpecificRestaurantPage");

/**************************************************** Page Content ****************************************************/
const SpecificRestaurantPage = () => {
  const { restaurantId } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [restaurantDishes, setRestaurantDishes] = useState([]);
  const [bestDishes, setBestDishes] = useState([]);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const { restaurant } = await userAPI.getRestaurantById({ restaurantId });
        setRestaurant(restaurant);
        const { restaurantDishes } = await dishAPI.getDishesByRestaurantId({ restaurantId });
        setRestaurantDishes(restaurantDishes);
        // setBestDishes(response.data.dishes.slice(0, 3)); // Assuming the first 3 dishes are the best
      } catch (error) {
        setRestaurant(null);
        const errorText = "There was an error while trying to fetch the Restaurant user!";
        logger.error(errorText, error);
      }
    };

    getRestaurant();
  }, [restaurantId]);

  if (!restaurant) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-base-100 shadow-xl rounded-lg p-6 mb-6">
        <div className="flex justify-between">
          <img alt={restaurant.name} className="w-60 h-60 rounded-lg mr-6" src={getUserImgURL ({ ...restaurant })} />
          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <h1 className="text-4xl font-bold">{restaurant.name}</h1>
              <StarRating textSize="lg" {...restaurant} />
            </div>
            <p className="text-lg text-gray-600 mb-2">📍 {restaurant.location}</p>
            <p className="text-xl text-gray-400 mb-2">{restaurant.description}</p>
            <div className="divider text-xl font-semibold mt-6 mb-3">Contact Information</div>
            <div className="mb-2">
              <span className="text-lg text-gray-400 font-semibold">📧 Email: </span>
              <span className="text-lg text-gray-600">{restaurant.email}</span>
            </div>
            <div className="mb-2">
              <span className="text-lg text-gray-400 font-semibold">📞 Phone: </span>
              <span className="text-lg text-gray-600">{restaurant.phone}</span>
            </div>
            <div>
              <span className="text-lg text-gray-400 font-semibold">🌐 Website: </span>
              <span className="text-lg text-gray-600">
                <a href={restaurant.web_page} className="text-blue-500 underline">
                  {restaurant.web_page}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base-200 shadow-xl rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4">Dishes</h2>
        <div className="flex flex-wrap justify-evenly gap-y-8 mb-2">
          {restaurantDishes.map((dish) => (
            <DishCard key={dish._id} {...dish} />
          ))}
        </div>
      </div>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { SpecificRestaurantPage };
