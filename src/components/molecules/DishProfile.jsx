/************************************************ Node modules needed ************************************************/
import { useContext, useEffect, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { AuthContext } from "/src/contexts";
import { dishAPI, reviewAPI } from "/src/api";
import { foodAllergenImgUrls } from "/src/constants";
import { getImgURL } from "/src/utils";
import { Loading, ReviewCard, StarRating } from "/src/components/atoms";
import { Logger } from "/src/utils";
import { RatedButton, TextParagraph, ToRateButton } from "/src/components/protons";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("DishProfile");

/************************************************ Component Definition ************************************************/
const DishProfile = ({ dishId }) => {
  const { isConsumer, loggedUser, userReviews } = useContext(AuthContext);

  const [dish, setDish] = useState(null);
  useEffect(() => {
    const getDish = async () => {
      try {
        const { dish } = await dishAPI.getDishById(dishId);
        setDish(dish);
      } catch (error) {
        setDish(null);
        const errorText = "There was an error while trying to fetch the food Dish!";
        logger.error(errorText, error);
      }
    };

    getDish();
  }, [dishId]);

  const [isDishRated, setIsDishRated] = useState(false);  //  by logged user
  useEffect(() => {
    if (isConsumer) {
      setIsDishRated(userReviews.some(review => review.dish._id.toString() === dishId.toString()));
    } else {
      setIsDishRated(false);
    }
  }, [isConsumer, userReviews]);

  const [isOwnDish, setIsOwnDish] = useState(false);
  useEffect(() => {
    if (loggedUser && dish) {
      setIsOwnDish(loggedUser.role === "restaurants" && loggedUser._id === dish.restaurant._id);
    }
  }, [dish, loggedUser]);

  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [dishReviews, setDishReviews] = useState([]);
  useEffect(() => {
    const getDishReviews = async () => {
      try {
        const { dishReviews } = await reviewAPI.getDishReviews(dish._id);
        setDishReviews(dishReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setIsLoadingReviews(false);
      } catch (error) {
        setDishReviews([]);
        const errorText = "There was an error while trying to fetch the Dish reviews!";
        logger.error(errorText, error);
      }
    };

    if (dish) {
      getDishReviews();
    }
  }, [dish]);

  return !dish ? (
    <Loading />
  ) : (
    <div className="container mx-auto p-6">
      <div className="bg-base-100 shadow-xl rounded-lg p-6 mb-6">
        <div className="flex justify-between gap-6">
          <div className="flex flex-col justify-start items-center gap-2 w-96">
            <img alt={dish.name} className="w-60 h-60 rounded-lg" src={getImgURL({ ...dish })} />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <h1 className="text-4xl font-bold">{dish.name}</h1>
              <StarRating {...dish} />
            </div>
            <p className="text-lg text-gray-600 mb-2">
              <span>🍽 </span>
              <a href={`/restaurants/${dish.restaurant._id}`} rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {dish.restaurant.name}
              </a>
            </p>
            <div className="flex justify-between gap-10">
              <div className="">
                {dish.description && (
                  <div className="mb-2 text-xl text-gray-400 italic">
                    <TextParagraph text={dish.description} />
                  </div>
                )}
              </div>
              <div className="text-right min-w-fit">
                {dish.price && (
                  <p className="text-xl text-secondary font-semibold">{dish.price} €</p>
                )}
              </div>
            </div>
            <div className="divider text-xl font-semibold mt-6 mb-3">Allergens</div>
            {dish.allergens && dish.allergens.length > 0 && (
              <div className="flex flex-wrap items-center justify-evenly gap-y-2 gap-x-4 mt-2">
                {dish.allergens.map((allergen, index) => (
                  <img key={index} alt={`${allergen} allergen logo`} className="w-14 h-14 rounded-full" src={foodAllergenImgUrls[allergen]} />
                ))}
              </div>
            )}
            {loggedUser && (isConsumer || isOwnDish) && (
              <>
                <div className="divider text-xl font-semibold mt-6 mb-5">Actions</div>
                <div className="flex justify-evenly">
                  {isConsumer ? (
                    isDishRated ? (
                      <RatedButton dishId={dish._id} />
                    ) : (
                      <ToRateButton />
                    )
                  ) : (
                    <p>Not consumer but editable</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="bg-base-200 shadow-xl rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4" id="reviews">Reviews</h2>
        <div className="mb-2 w-full flex flex-col justify-center gap-2">
          {isLoadingReviews ? (
            <Loading />
          ) :(
          dishReviews.length === 0 ? (
            <p className="text-lg text-gray-400">No reviews found for this dish.</p>
          ) : (
            dishReviews.map((review, index) => (
              <ReviewCard isTheNewest={index === dishReviews.length - 1} key={review._id} {...review} />
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { DishProfile };
