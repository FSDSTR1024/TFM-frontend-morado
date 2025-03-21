/*********************************************** External Node modules ************************************************/
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

/************************************************* Internal libraries *************************************************/
import { AuthContext, WebSocketContext } from "/src/contexts";
import { dishAPI } from "/src/api";
import { foodAllergenImgUrls } from "/src/constants";
import { getImgURL, Logger } from "/src/utils";
import { RatedButton, ToRateButton } from "/src/components/protons";
import { StarRating } from "/src/components/atoms";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("DishCard");

/************************************************ Component Definition ************************************************/
const DishCard = ({ _id, allergens, createdAt, description, img_url, isTheNewest, location, name, nrOfReviews, price, rating, restaurant }) => {
  const { isConsumer, loggedUser, userReviews } = useContext(AuthContext);
  const navigate = useNavigate();
  const { wsUpdateUserProfile } = useContext(WebSocketContext);

  const [isDishRated, setIsDishRated] = useState(false);  //  by logged user
  const [isRateable, setIsRateable] = useState(false);
  useEffect(() => {
    if (isConsumer) {
      setIsDishRated(userReviews.some(review => review.dish._id.toString() === _id.toString()));
      setIsRateable(true);
    } else {
      setIsDishRated(false);
      setIsRateable(false);
    }
  }, [isConsumer, userReviews]);

  const handleOnCardClick = useCallback(() => {
    navigate(`/dishes/${_id}`);
  }, [_id]);

  const [isLoading, setIsLoading] = useState(true);
  const handleOnDeleteClick = useCallback(async() => {
    if (confirm("Are you sure you want to delete this dish?") === true) {
      document.getElementById("on_loading_modal").showModal();
      try {
        await dishAPI.deleteDish(_id);
        wsUpdateUserProfile();
        setIsLoading(false);
      } catch (error) {
        const errorText = `Food dish ${_id} could not be deleted!`;
        logger.error(errorText, error);
      }
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      document.getElementById("on_loading_modal").close();
    }
  }, [isLoading])

  const [isOwnDish, setIsOwnDish] = useState(false);
  useEffect(() => {
    if (loggedUser) {
      setIsOwnDish(loggedUser.role === "restaurants" && loggedUser._id === restaurant._id);
    }
  }, [loggedUser, restaurant]);

  return (
    <div className="indicator">
      <div className="card border border-base-300 w-64 bg-base-100 shadow-xl indicator">
        {isTheNewest && <span className="indicator-item badge badge-primary font-semibold">NEW</span>}
        <div className="card-body flex justify-between p-0 gap-0 w-full">
          <div className="flex flex-col mx-3 my-3">
            <StarRating _id={_id} createdAt={createdAt} location={location} nrOfReviews={nrOfReviews} rating={rating} role="dishes" />
          </div>
          <div className="flex flex-col items-center mx-3">
            <img
              alt={`${_id} food dish picture`}
              className="h-40 rounded-lg object-scale-down"
              src={getImgURL({ img_url })}
            />
            <p className="text-md text-gray-600 text-center">
              <span>{"(from "}</span>
              <a href={`/restaurants/${restaurant._id}`} rel="noopener noreferrer" className="text-blue-500 underline">{restaurant.name}</a>
              <span>{")"}</span>
            </p>
            <h2 className="card-title text-xl text-center mt-2 mb-4">{name}</h2>
          </div>
          <div className="divider text-sm font-semibold mx-0 my-2">Description</div>
          <p className="text-md text-gray-500 mx-4 italic">{description}</p>
          <div className="divider text-sm font-semibold mx-0 my-2">Price</div>
          <p className="text-md text-gray-500 mx-4 font-semibold text-base text-center">{price ? `${price} €` : "N/A"}</p>
          <div className="mb-7">
            <div className="divider text-sm font-semibold my-2">Allergens</div>
            {allergens?.length > 0 ? (
              <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 mt-2">
                {allergens.map((allergen, index) => (
                  <img key={index} alt={`${allergen} allergen logo`} className="w-12 h-12 rounded-full" src={foodAllergenImgUrls[allergen]} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center">-</p>
            )}
          </div>
        </div>
      </div>
      <div className="indicator-item indicator-bottom indicator-center flex justify-center gap-7">
        {isRateable && (
          isDishRated ? (
            <RatedButton dishId={_id} />
          ) : (
            <ToRateButton dishId={_id} />
          )
        )}
        <button className="btn glass btn-outline btn-info btn-sm" onClick={handleOnCardClick}>View</button>
        {isOwnDish && (
          <button className="btn glass btn-outline btn-error btn-sm" onClick={handleOnDeleteClick}>Delete</button>
        )}
      </div>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { DishCard };
