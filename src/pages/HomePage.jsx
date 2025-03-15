/*********************************************** External Node modules ************************************************/
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/************************************************* Internal libraries *************************************************/
import { dishAPI, userAPI } from "/src/api";
import HomeImage from "/src/assets/HomeImage.png";  // DALL·E 2025-03-14 19.18.34 - A warm and inviting display of beautifully plated dishes on a wooden restaurant table. The table is set with a variety of dishes, including a salad, a pasta dish, and a dessert. The dishes are garnished with fresh herbs and edible flowers. The table is set with a white tablecloth and a small vase of flowers. The background is a warm, inviting restaurant setting with soft lighting and a cozy atmosphere. - Image by OpenAI
import { StarRating } from "/src/components/atoms";

/***************************************************** Constants ******************************************************/
const nrOfLeaderboardsItems = 5;

/********************************************** Subcomponents Definition **********************************************/
const LoadingDots = memo(() => (
  <div className="flex justify-center">
    <span className="loading loading-dots loading-md" />
  </div>
));

/**************************************************** Page Content ****************************************************/
const HomePage = () => {
  const navigate = useNavigate();

  const [isLoadingConsumers, setIsLoadingConsumers] = useState(true);
  const [topConsumers, setTopConsumers] = useState([]);
  useEffect(() => {
    const getTopConsumers = async () => {
      try {
        const { allConsumers } = await userAPI.getAllConsumers();
        setTopConsumers(allConsumers.sort((cons, nextCons) => {
          return cons.reviewed_dishes < nextCons.reviewed_dishes ? 1 : (
            cons.reviewed_dishes === nextCons.reviewed_dishes ? (
              cons.reviewed_restaurants < nextCons.reviewed_restaurants ? 1 : (
                cons.reviewed_restaurants === nextCons.reviewed_restaurants ? (
                  new Date(cons.createdAt) < new Date(nextCons.createdAt) ? 1 : -1
                ) : -1
              )
            ) : -1
          );
        }).slice(0, nrOfLeaderboardsItems));
        setIsLoadingConsumers(false);
      } catch (error) {
        setTopConsumers([]);
        const errorText = "There was an error while trying to fetch the TOP Consumer users!";
        logger.error(errorText, error);
      }
    };

    getTopConsumers();
  }, []);

  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);
  const [topRestaurants, setTopRestaurants] = useState([]);
  useEffect(() => {
    const getTopRestaurants = async () => {
      try {
        const { allRestaurants } = await userAPI.getAllRestaurants();
        setTopRestaurants(allRestaurants.sort((rest, nextRest) => {
          return rest.rating < nextRest.rating ? 1 : (
            rest.rating === nextRest.rating ? (
              rest.nrOfReviews < nextRest.nrOfReviews ? 1 : (
                rest.nrOfReviews === nextRest.nrOfReviews ? (
                  new Date(rest.createdAt) < new Date(nextRest.createdAt) ? 1 : -1
                ) : -1
              )
            ) : -1
          );
        }).slice(0, nrOfLeaderboardsItems));
        setIsLoadingRestaurants(false);
      } catch (error) {
        setTopRestaurants([]);
        const errorText = "There was an error while trying to fetch the TOP Restaurant users!";
        logger.error(errorText, error);
      }
    };

    getTopRestaurants();
  }, []);

  const [isLoadingDishes, setIsLoadingDishes] = useState(true);
  const [topDishes, setTopDishes] = useState([]);
  useEffect(() => {
    const getTopDishes = async () => {
      try {
        const { allDishes } = await dishAPI.getAllDishes();
        setTopDishes(allDishes.sort((rest, nextRest) => {
          return rest.rating < nextRest.rating ? 1 : (
            rest.rating === nextRest.rating ? (
              rest.nrOfReviews < nextRest.nrOfReviews ? 1 : (
                rest.nrOfReviews === nextRest.nrOfReviews ? (
                  new Date(rest.createdAt) < new Date(nextRest.createdAt) ? 1 : -1
                ) : -1
              )
            ) : -1
          );
        }).slice(0, nrOfLeaderboardsItems));
        setIsLoadingDishes(false);
      } catch (error) {
        setTopDishes([]);
        const errorText = "There was an error while trying to fetch the TOP food Dishes!";
        logger.error(errorText, error);
      }
    };

    getTopDishes();
  }, []);

  return (
    <div className="hero min-h-screen relative" style={{ backgroundImage: `url(${HomeImage})` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content w-full">
        <div className="flex flex-col items-center gap-10 w-full max-w-7xl">
          {/* Main Title */}
          <div className="badge bg-white/70 shadow-xl border border-white/20 backdrop-blur-sm px-4 pt-6 pb-7 flex gap-10">
            <h1 className="text-5xl font-bold text-primary">Find</h1>
            <h1 className="text-5xl font-bold text-secondary">Taste</h1>
            <h1 className="text-5xl font-bold text-accent">Rate</h1>
          </div>
          {/* Leaderboards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full animate-fadeIn">
            {/* Top Restaurants Leaderboard */}
            <div className="card bg-gradient-to-b from-violet-900/80 to-violet-800/80 shadow-xl border border-violet-500/30 backdrop-blur-sm hover:shadow-violet-500/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="card-body p-5">
                <h2 className="card-title text-center justify-center text-violet-200 font-bold mb-0 cursor-pointer" onClick={() => navigate("/restaurants")}>
                  <span>🍽️</span>
                  <span>Top-Rated Restaurants</span>
                </h2>
                <div className="divider my-0"></div>
                <ul className="space-y-1">
                  {isLoadingRestaurants ? (
                    <LoadingDots />
                  ) : (
                    topRestaurants.map((restaurant, index) => (
                      restaurant.nrOfReviews > 0 && (
                        <li
                          className="flex justify-between items-center px-2 py-1 rounded-lg cursor-pointer bg-violet-700/40 hover:bg-violet-600/50 transition-all duration-200"
                          key={restaurant._idid}
                          onClick={() => navigate(`/restaurants/${restaurant._id}`)}
                        >
                          <div className="flex items-center">
                            <div className={`badge ${index < 3 ? 'badge-primary' : 'badge-ghost'} mr-2 px-2`}>
                              {index + 1}
                            </div>
                            <span>{restaurant.name}</span>
                          </div>
                          <div className="badge py-4 pl-0 pr-2">
                            <StarRating showReviews={false} {...restaurant} />
                          </div>
                        </li>
                      )
                    ))
                  )}
                </ul>
              </div>
            </div>
            {/* Top Dishes Leaderboard */}
            <div className="card bg-gradient-to-b from-pink-900/80 to-pink-800/80 shadow-xl border border-pink-500/30 backdrop-blur-sm hover:shadow-pink-500/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="card-body p-5">
                <h2 className="card-title text-center justify-center text-pink-200 font-bold mb-0 cursor-pointer" onClick={() => navigate("/dishes")}>
                  <span>🤤</span>
                  <span>Fan Favorite Dishes</span>
                </h2>
                <div className="divider my-0"></div>
                <ul className="space-y-1">
                  {isLoadingDishes ? (
                    <LoadingDots />
                  ) : (
                    topDishes.map((dish, index) => (
                      dish.nrOfReviews > 0 && (
                        <li
                          className="flex justify-between items-center px-2 py-1 rounded-lg cursor-pointer bg-pink-700/40 hover:bg-pink-600/50 transition-all duration-200"
                          key={dish._id}
                          onClick={() => navigate(`/dishes/${dish._id}`)}
                        >
                          <div className="flex items-center">
                            <div className={`badge ${index < 3 ? 'badge-secondary' : 'badge-ghost'} mr-2 px-2`}>
                              {index + 1}
                            </div>
                            <span>{dish.name}</span>
                          </div>
                          <div className="badge py-4 pl-0 pr-2">
                            <StarRating showReviews={false} {...dish} />
                          </div>
                        </li>
                      )
                    ))
                  )}
                </ul>
              </div>
            </div>
            {/* Top Consumers Leaderboard */}
            <div className="card bg-gradient-to-b from-teal-900/80 to-teal-800/80 shadow-xl border border-teal-500/30 backdrop-blur-sm hover:shadow-teal-500/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="card-body p-5">
                <h2 className="card-title text-center justify-center text-teal-200 font-bold mb-0 cursor-pointer" onClick={() => navigate("/consumers")}>
                  <span>🏆</span>
                  <span>Most Active Foodies</span>
                </h2>
                <div className="divider my-0"></div>
                <ul className="space-y-1">
                  {isLoadingConsumers ? (
                    <LoadingDots />
                  ) : (
                    topConsumers.map((consumer, index) => (
                      consumer.reviewed_dishes && (
                        <li
                          className="flex justify-between items-center px-2 py-1 rounded-lg cursor-pointer bg-teal-700/40 hover:bg-teal-600/50 transition-all duration-200"
                          key={consumer._id}
                          onClick={() => navigate(`/consumers/${consumer._id}`)}
                        >
                          <div className="flex items-center">
                            <div className={`badge ${index < 3 ? 'badge-accent' : 'badge-ghost'} mr-2 px-2`}>
                              {index + 1}
                            </div>
                            <span>{consumer.name} {consumer.surname}</span>
                          </div>
                          <span className="font-mono badge px-2 py-3">{consumer.reviewed_dishes} revs.</span>
                        </li>
                      )
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
          {/* Call to Action */}
          <button className="btn btn-primary btn-lg glass animate-pulse" onClick={() => navigate("/dishes")}>Start Exploring</button>
        </div>
      </div>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { HomePage };
