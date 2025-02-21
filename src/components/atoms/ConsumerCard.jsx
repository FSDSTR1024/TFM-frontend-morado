/*********************************************** External Node modules ************************************************/
import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';

/************************************************ Component Definition ************************************************/
const ConsumerCard = ({ _id, img_url, isTheNewest, name, reviewed_dishes, reviewed_restaurants, surname }) => {
  const navigate = useNavigate();

  const handleOnCardClick = useCallback(() => {
    navigate(`/consumers/${_id}`);
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
      className="card w-72 bg-base-100 shadow-xl cursor-pointer"
      onClick={handleOnCardClick}
    >
      <div className="flex items-center p-2 pr-4 justify-between h-28">
        <img
          src={img_url ? img_url : notDefinedImgUrl}
          alt="Profile"
          className="w-20 h-20 rounded-full mr-6"
        />
        <div className="flex flex-col items-end">
          {isTheNewest && <div className="badge badge-primary mb-2">NEW</div>}
          <h2 className="card-title text-2xl">{name}</h2>
          <p className="text-lg text-gray-600">{surname}</p>
        </div>
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="p-5 pt-2 pb-3">
        <h3 className="text-xl font-semibold text-center mb-4">Reviews</h3>
        <div className="flex justify-between text-lg">
          <strong>Restaurants:</strong>
          <span>{reviewed_restaurants.toLocaleString("en-US")}</span>
        </div>
        <div className="flex justify-between text-lg">
          <strong>Dishes:</strong>
          <span>{reviewed_dishes.toLocaleString("en-US")}</span>
        </div>
        <h3 className="text-xl font-semibold text-center mt-4">Achievements</h3>
        {achievements && achievements.length > 0 ? (
          <div className="flex justify-center space-x-4 mt-2">
            {achievements.map((achievement, index) => (
              <img key={index} alt={`Achievement ${index + 1}`} className="w-10 h-10" src={achievement} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ConsumerCard };
