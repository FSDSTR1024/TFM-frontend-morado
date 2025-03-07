/************************************************ Component Definition ************************************************/
const StarRating = ({ _id, nrOfReviews, rating }) => {
  const starsColor = "bg-orange-400";
  const starsRating = Math.floor(rating);

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-2">
        <div className="rating rating-sm rating-half">
          <input className="rating-hidden cursor-default" defaultChecked={starsRating === 0} disabled name={`rating-11_${_id}`} type="radio" />
          {[...Array(10)].map((_, index) => {
            return (
              <input
                aria-label={`${index / 2} star`}
                className={`mask mask-star-2 mask-half-${index % 2 === 0 ? 1 : 2} ${starsColor} cursor-default`}
                defaultChecked={(index + 1) === starsRating}
                disabled
                key={index}
                name={`rating-11_${_id}`}
                type="radio"
              />
            );
          })}
        </div>
        {nrOfReviews > 0 ? <p className="text-sm text-gray-600">({rating})</p> : null}
      </div>
      <p className="text-sm text-gray-600 font-semibold">{nrOfReviews.toLocaleString("en-US")} reviews</p>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { StarRating };
