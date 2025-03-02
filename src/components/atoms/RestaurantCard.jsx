/*********************************************** External Node modules ************************************************/
import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';

/************************************************* Internal libraries *************************************************/
import { getUserImgURL } from "/src/utils";
import { StarRating } from "/src/components/atoms";

/************************************************ Component Definition ************************************************/
const RestaurantCard = ({ _id, description, img_url, is_activated, isTheNewest, location, name, nrOfDishes, nrOfReviews, rating, web_page }) => {
  const navigate = useNavigate();

  const handleOnCardClick = useCallback(() => {
    navigate(`/restaurants/${_id}`);
  }, [_id]);

  const achievement1Url = "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp";
  const achievement2Url = "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp";
  const achievement3Url = "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp";
  const achievement4Url = "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp";

  let achievements = [];
  if (name.includes("e")) achievements.push(achievement1Url);
  if (name.includes("i")) achievements.push(achievement2Url);
  if (name.includes("o")) achievements.push(achievement3Url);
  if (name.includes("u")) achievements.push(achievement4Url);

  return (
    <div className="indicator">
      <div className="card border border-base-300 w-72 bg-base-100 shadow-xl indicator">
        {isTheNewest && <span className="indicator-item badge badge-primary font-semibold">NEW</span>}
        <div className="card-body flex justify-between p-0 gap-0">
          <div className="flex items-center my-4 mx-3 justify-between">
            <div className="flex flex-col items-start">
              <h2 className="card-title text-2xl">{name}</h2>
              <p className="text-lg text-gray-600">{location}</p>
            </div>
            <img
              alt={`${_id} restaurant profile picture`}
              className="w-32 h-32 rounded-lg ml-6"
              src={getUserImgURL ({ img_url, is_activated })}
            />
          </div>
          {description && (
            <div className="mx-3">
              <p className="text-md text-gray-500">{description}</p>
            </div>
          )}
          <div className="divider text-xl font-semibold mx-0 my-4">Details</div>
          <div className="mx-4 my-0">
            <div className="flex justify-between text-base">
              <strong>Dishes:</strong>
              <span>{nrOfDishes.toLocaleString("en-US")}</span>
            </div>
            <div className="flex justify-between items-center text-base">
              <strong>Rating:</strong>
              <StarRating _id={_id} nrOfReviews={nrOfReviews} rating={rating} starsSize="sm" textSize="sm" />
            </div>
            {web_page && (
              <div className="flex justify-between text-base">
                <strong>Website:</strong>
                <a href={web_page} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{web_page}</a>
              </div>
            )}
          </div>
          <div className="mb-6">
            <div className="divider text-xl font-semibold mt-6">Achievements</div>
            {achievements && achievements.length > 0 && (
              <div className="flex justify-center space-x-4 mt-2">
                {achievements.map((achievement, index) => (
                  <img key={index} alt={`Achievement ${index + 1}`} className="w-12 h-12 rounded-full" src={achievement} />
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
export { RestaurantCard };
