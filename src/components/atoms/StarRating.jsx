/************************************************ Node modules needed *************************************************/
import { memo } from "react";

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
const StarRating = ({ _id, nrOfReviews, rating }) => {
  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-2">
        <div className="rating rating-sm rating-half">
          <input className="rating-hidden cursor-default" defaultChecked name={`rating-11_${_id}`} type="radio" />
          {[...Array(Math.floor(rating / 2))].map((_, index) => (
            <FullCheckedStar _id={_id} key={index} />
          ))}
          {rating % 2 !== 0 && (
            <>
              <HalfCheckedStar _id={_id} />
              <HalfUncheckedStar _id={_id} />
            </>
          )}
          {[...Array(5 - Math.ceil(rating / 2))].map((_, index) => (
            <FullUncheckedStar _id={_id} key={index} />
          ))}
        </div>
        {nrOfReviews > 0 ? <p className="text-sm text-gray-600">({rating.toFixed(1)})</p> : null}
      </div>
      <p className="text-sm text-gray-600 font-semibold">{nrOfReviews.toLocaleString("en-US")} reviews</p>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { StarRating };
