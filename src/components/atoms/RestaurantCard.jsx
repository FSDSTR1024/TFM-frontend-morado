/*********************************************** External Node modules ************************************************/
import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';

/************************************************ Component Definition ************************************************/
const RestaurantCard = ({ _id, description, img_url, isTheNewest, location, name, nrOfDishes, nrOfReviews, rating, web_page }) => {
  const navigate = useNavigate();

  const handleOnCardClick = useCallback(() => {
    navigate(`/restaurants/${_id}`);
  }, [_id]);

  const notDefinedImgUrl = "https://res.cloudinary.com/dkpdltxzm/image/upload/ar_1:1,c_auto,g_auto/r_max/v1739315334/mw7prcgn3nykmaakze6b.png";
  // const notActiveUserImgUrl = "https://res.cloudinary.com/dkpdltxzm/image/upload/ar_1:1,c_auto_pad,g_auto/r_max/v1739303950/uzhmdi16bdjvilwsaiy4.png";
  // const badgeSelector = null;

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
    <div
      className="card w-96 bg-base-100 shadow-xl cursor-pointer"
      onClick={handleOnCardClick}
    >
      <div className="flex items-center p-4 pb-0 justify-between h-40">
        <div className="flex flex-col items-start p-2">
          {isTheNewest && <div className="badge badge-primary mb-2">NEW</div>}
          <h2 className="card-title text-2xl">{name}</h2>
          <p className="text-lg text-gray-600">{location}</p>
        </div>
        <img
          alt="Restaurant"
          className="w-32 h-32 rounded-lg ml-6"
          src={img_url ? img_url : notDefinedImgUrl}
        />
      </div>
      {description && (
        <div className="p-4 pt-2">
          <p className="text-md text-gray-500">{description}</p>
        </div>
      )}
      <div className="border-t border-gray-200"></div>
      <div className="p-6 pt-2 pb-3">
        <h3 className="text-xl font-semibold text-center mb-4">Details</h3>
        <div className="flex justify-between text-lg">
          <strong>Rating:</strong>
          <span>{rating}</span>
        </div>
        <div className="flex justify-between text-lg">
          <strong>Number of Dishes:</strong>
          <span>{nrOfDishes.toLocaleString("en-US")}</span>
        </div>
        <div className="flex justify-between text-lg">
          <strong>Number of Reviews:</strong>
          <span>{nrOfReviews.toLocaleString("en-US")}</span>
        </div>
        {web_page && (
          <div className="flex justify-between text-lg">
            <strong>Website:</strong>
            <a href={web_page} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{web_page}</a>
          </div>
        )}
        <h3 className="text-xl font-semibold text-center mt-6">Achievements</h3>
        {achievements && achievements.length > 0 ? (
          <div className="flex justify-center space-x-4 mt-2">
            {achievements.map((achievement, index) => (
              <img key={index} alt={`Achievement ${index + 1}`} className="w-12 h-12" src={achievement} />
            ))}
          </div>
        ) : (
          <div className="h-12"></div>
        )}
      </div>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { RestaurantCard };
