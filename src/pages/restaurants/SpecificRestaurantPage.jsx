/*********************************************** External Node modules ************************************************/
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { Loading } from "/src/components/atoms";
import { Logger } from "/src/utils";
import { notActiveUserImgUrl, notDefinedImgUrl } from "/src/constants";
import { userAPI } from "/src/api";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("SpecificRestaurantPage");

/**************************************************** Page Content ****************************************************/
const SpecificRestaurantPage = () => {
  const { restaurantId } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [bestDishes, setBestDishes] = useState([]);
  const [allDishes, setAllDishes] = useState([]);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const { restaurant } = await userAPI.getRestaurantById({ restaurantId });
        setRestaurant(restaurant);
        // setBestDishes(response.data.dishes.slice(0, 3)); // Assuming the first 3 dishes are the best
        // setAllDishes(response.data.dishes);
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

  const restaurantImgUrl = restaurant.is_activated ? (restaurant.img_url ? restaurant.img_url : notDefinedImgUrl) : notActiveUserImgUrl;
  return (
    <div className="container mx-auto p-6">
      <div className="bg-base-100 shadow-xl rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <img
            src={restaurantImgUrl}
            alt={restaurant.name}
            className="w-32 h-32 rounded-lg mr-4"
          />
          <div>
            <h1 className="text-4xl font-bold">{restaurant.name}</h1>
            <p className="text-lg text-gray-600">{restaurant.location}</p>
            <p className="text-lg text-gray-600">{restaurant.email}</p>
            <p className="text-lg text-gray-600">{restaurant.phone}</p>
            <p className="text-lg text-gray-600">{restaurant.web_page}</p>
          </div>
        </div>
        <p className="text-gray-600">{restaurant.description}</p>
      </div>

      <div className="bg-base-100 shadow-xl rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4">Best Dishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bestDishes.map((dish) => (
            <div key={dish._id} className="card bg-base-200 shadow-md p-4">
              <img
                src={dish.img_url || "https://via.placeholder.com/150"}
                alt={dish.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold">{dish.name}</h3>
              <p className="text-gray-600">{dish.description}</p>
              <p className="text-gray-600">Price: ${dish.price}</p>
              <p className="text-gray-600">Rating: {dish.rating}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-base-100 shadow-xl rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4">All Dishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allDishes.map((dish) => (
            <div key={dish._id} className="card bg-base-200 shadow-md p-4">
              <img
                src={dish.img_url || "https://via.placeholder.com/150"}
                alt={dish.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold">{dish.name}</h3>
              <p className="text-gray-600">{dish.description}</p>
              <p className="text-gray-600">Price: ${dish.price}</p>
              <p className="text-gray-600">Rating: {dish.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { SpecificRestaurantPage };
