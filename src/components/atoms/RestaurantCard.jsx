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
    <div className="card w-96 bg-base-100 shadow-xl flex justify-between">
      <div className="flex justify-center">
        <button className="btn glass btn-block btn-outline btn-info btn-sm" onClick={handleOnCardClick}>View</button>
      </div>
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
      <div className="divider text-xl font-semibold m-0">Details</div>
      <div className="p-6 pt-2 pb-0">
        <div className="flex justify-between text-base">
          <strong>Rating:</strong>
          <span>{rating}</span>
        </div>
        <div className="flex justify-between text-base">
          <strong>Number of Dishes:</strong>
          <span>{nrOfDishes.toLocaleString("en-US")}</span>
        </div>
        <div className="flex justify-between text-base">
          <strong>Number of Reviews:</strong>
          <span>{nrOfReviews.toLocaleString("en-US")}</span>
        </div>
        {web_page && (
          <div className="flex justify-between text-base">
            <strong>Website:</strong>
            <a href={web_page} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{web_page}</a>
          </div>
        )}
      </div>
      <div className="pb-3">
        <div className="h-24">
          <div className="divider text-xl font-semibold mt-6">Achievements</div>
          {achievements && achievements.length > 0 ? (
            <div className="flex justify-center space-x-4 mt-2">
              {achievements.map((achievement, index) => (
                <img key={index} alt={`Achievement ${index + 1}`} className="w-12 h-12 rounded-full" src={achievement} />
              ))}
            </div>
          ) : (
            <div className="h-12"></div>
          )}
        </div>
      </div>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { RestaurantCard };
