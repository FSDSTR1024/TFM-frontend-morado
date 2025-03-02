/*********************************************** External Node modules ************************************************/
import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';

/************************************************* Internal libraries *************************************************/
import { foodAllergenImgUrls } from "/src/constants";
import { getImgURL } from "/src/utils";
import { StarRating } from "/src/components/atoms";

/************************************************ Component Definition ************************************************/
const DishCard = ({ _id, allergens, description, img_url, isTheNewest, name, nrOfReviews, price, rating, restaurant }) => {
  const navigate = useNavigate();

  const handleOnCardClick = useCallback(() => {
    navigate(`/dishes/${_id}`);
  }, [_id]);

  return (
    <div className="indicator">
      <div className="card border border-base-300 w-96 bg-base-100 shadow-xl indicator">
        {isTheNewest && <span className="indicator-item badge badge-primary font-semibold">NEW</span>}
        <div className="card-body flex justify-between p-0 gap-0">
          <img
            alt={`${_id} food dish picture`}
            className="w-full h-40 rounded-lg object-scale-down mt-4"
            src={getImgURL({ img_url })}
          />
          <p className="text-md text-gray-600 text-center mt-2">
            <span>{"(from "}</span>
            <a href={`/restaurants/${restaurant._id}`} rel="noopener noreferrer" className="text-blue-500 underline">{restaurant.name}</a>
            <span>{")"}</span>
          </p>
          <div className="mx-4 mb-3">
            <div className="flex justify-between">
              <div className="flex flex-col items-start">
                <h2 className="card-title text-2xl">{name}</h2>
              </div>
              <StarRating _id={_id} rating={rating} nrOfReviews={nrOfReviews} starsSize="sm" textSize="sm" />
            </div>
          </div>
          <div className="divider text-xl font-semibold mx-0 my-2">Description</div>
          <p className="text-md text-gray-500 mx-4">{description}</p>
          <div className="divider text-xl font-semibold mx-0 my-4">Price</div>
          <p className="text-md text-gray-500 mx-4 font-semibold text-lg text-center">{price} €</p>
          <div className="mb-6">
            <div className="divider text-xl font-semibold">Allergens</div>
            {allergens && allergens.length > 0 && (
              <div className="flex flex-wrap items-center justify-evenly gap-y-2 mt-2">
                {allergens.map((allergen, index) => (
                  <img key={index} alt={`${allergens} allergen logo`} className="w-12 h-12 rounded-full" src={foodAllergenImgUrls[allergen]} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="indicator-item indicator-bottom indicator-center flex justify-center">
        <button className="btn glass btn-outline btn-info btn-sm" onClick={handleOnCardClick}>View</button>
      </div>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { DishCard };
