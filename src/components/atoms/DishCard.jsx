/*********************************************** External Node modules ************************************************/
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

/************************************************* Internal libraries *************************************************/
import { AuthContext, WebSocketContext } from "/src/contexts";
import { dishAPI } from "/src/api";
import { foodAllergenImgUrls } from "/src/constants";
import { getImgURL } from "/src/utils";
import { StarRating } from "/src/components/atoms";

/************************************************ Component Definition ************************************************/
const DishCard = ({ _id, allergens, description, img_url, isTheNewest, name, nrOfReviews, price, rating, restaurant }) => {
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { wsUpdateUserProfile } = useContext(WebSocketContext);

  const handleOnCardClick = useCallback(() => {
    navigate(`/dishes/${_id}`);
  }, [_id]);

  const handleOnDeleteClick = useCallback(async() => {
    if (confirm("Are you sure you want to delete this dish?") === true) {
      try {
        await dishAPI.deleteDish(_id);
        wsUpdateUserProfile();
      } catch (error) {
        const errorText = `Food dish ${_id} could not be deleted!`;
        logger.error(errorText, error);
      }
    }
  }, []);

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
            <StarRating _id={_id} rating={rating} nrOfReviews={nrOfReviews} />
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
          <p className="text-md text-gray-500 mx-4">{description}</p>
          <div className="divider text-sm font-semibold mx-0 my-2">Price</div>
          <p className="text-md text-gray-500 mx-4 font-semibold text-base text-center">{price} €</p>
          <div className="mb-7">
            <div className="divider text-sm font-semibold my-2">Allergens</div>
            {allergens && allergens.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 mt-2">
                {allergens.map((allergen, index) => (
                  <img key={index} alt={`${allergens} allergen logo`} className="w-12 h-12 rounded-full" src={foodAllergenImgUrls[allergen]} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="indicator-item indicator-bottom indicator-center flex justify-center gap-7">
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
