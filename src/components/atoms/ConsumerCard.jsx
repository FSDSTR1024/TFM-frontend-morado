/*********************************************** External Node modules ************************************************/
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

/************************************************* Internal libraries *************************************************/
import { getUserImgURL, roundImg } from "/src/utils";

/********************************************** Subcomponents Definition **********************************************/
const OfflineAvatar = memo(({ _id, img_url, is_activated }) => (
  <div className="avatar avatar-offline h-20 w-20">
    <img
      alt={`${_id} consumer profile picture`}
      className="border mr-6 rounded-full"
      src={roundImg({ imgURL: getUserImgURL({ img_url, is_activated }) })}
    />
  </div>
));
const OnlineAvatar = memo(({ _id, img_url, is_activated }) => (
  <div className="avatar avatar-online h-20 w-20">
    <img
      alt={`${_id} consumer profile picture`}
      className="border mr-6 rounded-full"
      src={roundImg({ imgURL: getUserImgURL({ img_url, is_activated }) })}
    />
  </div>
));

/************************************************ Component Definition ************************************************/
const ConsumerCard = ({ _id, img_url, is_activated, isConsumerOnline, isTheNewest, name, reviewed_dishes, reviewed_restaurants, surname }) => {
  const navigate = useNavigate();

  const handleOnCardClick = useCallback(() => {
    navigate(`/consumers/${_id}`);
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
      <div className="card border border-base-300 w-56 bg-base-100 shadow-xl indicator">
        {isTheNewest && <span className="indicator-item badge badge-primary font-semibold">NEW</span>}
        <div className="card-body flex justify-between p-0">
          <div className="flex items-center my-4 mx-2 justify-between">
            {isConsumerOnline ? (
              <OnlineAvatar _id={_id} img_url={img_url} is_activated={is_activated} />
            ) : (
              <OfflineAvatar _id={_id} img_url={img_url} is_activated={is_activated} />
            )}
            <div className="card-title flex flex-col items-end gap-0">
              <h2 className="text-2xl">{name}</h2>
              <p className="text-lg text-gray-600">{surname}</p>
            </div>
          </div>
          <div className="divider text-sm font-semibold m-0">Reviews</div>
          <div className="m-3 mt-2 mb-0">
            <div className="flex justify-between text-base">
              <strong>Dishes:</strong>
              <span>{reviewed_dishes.toLocaleString("en-US")}</span>
            </div>
            <div className="flex justify-between text-base">
              <strong>Restaurants:</strong>
              <span>{reviewed_restaurants.toLocaleString("en-US")}</span>
            </div>
          </div>
          <div className="mb-6">
            <div className="divider text-sm font-semibold mt-4">Achievements</div>
            {achievements && achievements.length > 0 && (
              <div className="flex flex-wrap justify-center gap-y-2 gap-x-4 mt-2">
                {achievements.map((achievement, index) => (
                  <img key={index} alt={`Achievement ${index + 1}`} className="w-10 h-10" src={achievement} />
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
export { ConsumerCard };
