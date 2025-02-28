/*********************************************** External Node modules ************************************************/
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { dishAPI, userAPI } from "/src/api";
import { Loading, StarRating } from "/src/components/atoms";
import { Logger } from "/src/utils";
import { notActiveUserImgUrl, notDefinedImgUrl } from "/src/constants";

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

  const restaurantImgUrl = restaurant.is_activated ? (restaurant.img_url ? restaurant.img_url : notDefinedImgUrl) : notActiveUserImgUrl;
  return (
    <div className="container mx-auto p-6">
      <div className="bg-base-100 shadow-xl rounded-lg p-6 mb-6">
        <div className="flex justify-between">
          <img
            src={restaurantImgUrl}
            alt={restaurant.name}
            className="w-60 h-60 rounded-lg mr-6"
          />
          <div className="flex flex-col w-full">
            <div className="flex items-center mb-2 gap-3">
              <h1 className="text-4xl font-bold">{restaurant.name}</h1>
              <StarRating id={restaurant._id} rating={restaurant.rating} />
              {restaurant.rating && <p className="text-lg text-gray-600">({restaurant.rating})</p>}
              <p className="text-lg text-gray-600">{restaurant.nrOfReviews} reviews</p>
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
              <span className="text-lg text-gray-600"><a href={restaurant.web_page} className="text-blue-500 underline">{restaurant.web_page}</a></span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base-100 shadow-xl rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4">Dishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {restaurantDishes.map((dish) => (
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
