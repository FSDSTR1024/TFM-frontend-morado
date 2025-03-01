/*********************************************** External Node modules ************************************************/
import { useEffect, useState } from "react";

/***************************************************** Constants ******************************************************/

/************************************************ Component Definition ************************************************/
const StarRating = ({ id, rating, size = "md" }) => {
  const starsColor = "bg-orange-400";
  const starsRating = Math.floor(rating);

  return (
    <div className={`rating rating-${size} rating-half`}>
      <input className="rating-hidden cursor-default" defaultChecked={starsRating === 0} disabled name={`rating-11_${id}`} type="radio" />
      {[...Array(10)].map((_, index) => {
        return (
          <input
            aria-label={`${index / 2} star`}
            className={`mask mask-star-2 mask-half-${index % 2 === 0 ? 1 : 2} ${starsColor} cursor-default`}
            defaultChecked={(index + 1) === starsRating}
            disabled
            key={index}
            name={`rating-11_${id}`}
            type="radio"
          />
        );
      })}
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { StarRating };
