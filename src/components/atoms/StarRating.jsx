/************************************************ Node modules needed *************************************************/
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

/********************************************** Subcomponents Definition **********************************************/
const FullCheckedStar = memo(({ _id }) => (
  <>
    <input
      className="mask mask-star-2 mask-half-1 bg-orange-400 cursor-default"
      defaultChecked
      disabled
      name={`rating-11_${_id}`}
      type="radio"
    />
    <input
      className="mask mask-star-2 mask-half-2 bg-orange-400 cursor-default"
      defaultChecked
      disabled
      name={`rating-11_${_id}`}
      type="radio"
    />
  </>
));
const FullUncheckedStar = memo(({ _id }) => (
  <>
    <input
      className="mask mask-star-2 mask-half-1 bg-orange-400 cursor-default"
      disabled
      name={`rating-11_${_id}`}
      type="radio"
    />
    <input
      className="mask mask-star-2 mask-half-2 bg-orange-400 cursor-default"
      disabled
      name={`rating-11_${_id}`}
      type="radio"
    />
  </>
));
const HalfCheckedStar = memo(({ _id }) => (
  <input
    className="mask mask-star-2 mask-half-1 bg-orange-400 cursor-default"
    defaultChecked
    disabled
    name={`rating-11_${_id}`}
    type="radio"
  />
));
const HalfUncheckedStar = memo(({ _id }) => (
  <input
    className="mask mask-star-2 mask-half-2 bg-orange-400 cursor-default"
    disabled
    name={`rating-11_${_id}`}
    type="radio"
  />
));

/************************************************ Component Definition ************************************************/
const StarRating = ({ _id, createdAt, location = undefined, nrOfReviews, rating, role, showReviews = true }) => {
  const navigate = useNavigate();

  const intRating = Math.floor(rating);
  const timestamp = new Date(createdAt);

  const handleOnReviewsClick = useCallback(() => {
    navigate(`/${role}/${_id}#reviews`);
  }, []);

  return (
    <div className="flex flex-col items-end">
      <div className="flex gap-2">
        <div className="rating rating-sm rating-half">
          <input className="rating-hidden cursor-default" defaultChecked name={`rating-11_${_id}`} type="radio" />
          {[...Array(Math.floor(intRating / 2))].map((_, index) => (
            <FullCheckedStar _id={`${timestamp}_${_id}_${location}`} key={index} />
          ))}
          {intRating % 2 !== 0 && (
            <>
              <HalfCheckedStar _id={`${timestamp}_${_id}_${location}`} />
              <HalfUncheckedStar _id={`${timestamp}_${_id}_${location}`} />
            </>
          )}
          {[...Array(5 - Math.ceil(intRating / 2))].map((_, index) => (
            <FullUncheckedStar _id={`${timestamp}_${_id}_${location}`} key={index} />
          ))}
        </div>
        {nrOfReviews > 0 ? <p className="text-sm text-gray-600">({rating.toFixed(1)})</p> : null}
      </div>
      {showReviews && (
        <p
          className={`text-sm font-semibold ${nrOfReviews > 0 ? "text-blue-500 cursor-pointer hover:underline" : "text-gray-600"}`}
          onClick={handleOnReviewsClick}
        >
          {nrOfReviews.toLocaleString("en-US")} reviews
        </p>
      )}
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { StarRating };
