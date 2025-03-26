/*********************************************** External Node modules ************************************************/
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/************************************************* Internal libraries *************************************************/
import { AuthContext, WebSocketContext } from "/src/contexts";
import { dishAPI, userAPI } from "/src/api";
import { getRestaurantAchievements, getUserImgURL } from "/src/utils";
import { StarRating } from "/src/components/atoms";

/************************************************ Component Definition ************************************************/
const RestaurantCard = ({ _id, createdAt, description, email, followers, img_url, is_activated, isTheNewest, location, name, nrOfDishes, nrOfReviews, phone, rating, role, web_page }) => {
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { wsNewFollowerAdded } = useContext(WebSocketContext);

  const [isConsumer, setIsConsumer] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    setIsConsumer(loggedUser?.role === "consumers");
    setIsFollowing(followers.some((follower) => follower._id === loggedUser?._id));
  }, [followers, loggedUser]);

  const [restaurantDishes, setRestaurantDishes] = useState([]);
  useEffect(() => {
    const getRestaurantDishes = async () => {
      try {
        const { restaurantDishes } = await dishAPI.getDishesByRestaurantId(_id);
        setRestaurantDishes(restaurantDishes);
      } catch (error) {
        setRestaurantDishes([]);
        const errorText = "There was an error while trying to fetch the Restaurant dishes!";
        logger.error(errorText, error);
      }
    };

    getRestaurantDishes();
  }, [_id]);

  const handleFollowClick = useCallback(async () => {
    document.getElementById("on_loading_modal").showModal();
    await userAPI.followRestaurant({ restaurantId: _id, currentFollowers: followers, newFollower: loggedUser});
    wsNewFollowerAdded();
    window.location.reload();
    document.getElementById("on_loading_modal").close();
  }, [_id, followers, loggedUser]);

  const handleOnCardClick = useCallback(() => {
    if (_id === loggedUser?._id) {
      navigate("/profile", { state: { loggedUser } });
    } else {
      navigate(`/restaurants/${_id}`);
    }
  }, [_id, loggedUser]);

  const [achievements, setAchievements] = useState([]);
  useEffect(() => {
    setAchievements(getRestaurantAchievements({ createdAt, dishes: restaurantDishes, nrOfDishes }));
  }, [restaurantDishes]);

  return (
    <div className="indicator">
      <div className="card border border-base-300 w-96 bg-base-100 shadow-xl indicator">
        {isTheNewest && <span className="indicator-item badge badge-primary font-semibold">NEW</span>}
        <div className="card-body flex justify-between p-0 gap-0 mb-8">
          <div className="flex items-center mt-4 mx-4 justify-between gap-6">
            <div className="flex flex-col items-start">
              <h2 className="card-title text-2xl">{name}</h2>
              <p className="text-lg text-gray-400">
                <span>{"🍽️ "}</span>
                <span>{nrOfDishes.toLocaleString("en-US")}</span>
                <span>{" dishes"}</span>
              </p>
              <p className="text-lg text-gray-600">📍 {location}</p>
              {description && <p className="text-base text-gray-400 mt-3 italic">{description}</p>}
            </div>
            <div className="flex flex-col items-end gap-3">
              <StarRating _id={_id} createdAt={createdAt} name={name} nrOfReviews={nrOfReviews} rating={rating} role={role} />
              <div className="h-32 w-32">
                <img
                  alt={`${_id} restaurant profile picture`}
                  className="rounded-lg"
                  src={getUserImgURL ({ img_url, is_activated })}
                />
              </div>
              <div className="flex gap-1 items-center text-error">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                <span>{followers.length.toLocaleString("en-US")}</span>
                <span>follower{followers.length !== 1 && "s"}</span>
              </div>
            </div>
          </div>
          <div className="divider text-md font-semibold mx-0 my-4">Details</div>
          <div className="mx-4 my-0 gap-2">
            <div className="flex justify-between text-lg">
              <p className="text-gray-400 font-semibold">📧 Email: </p>
              <p className="text-gray-600 text-right">{email}</p>
            </div>
            <div className="flex justify-between text-lg">
              <p className="text-gray-400 font-semibold">📞 Phone: </p>
              <p className="text-gray-600 text-right">{phone ? phone : "N/A"}</p>
            </div>
            <div className="flex justify-between text-lg">
              <p className="text-gray-400 font-semibold">🌐 Website: </p>
              <p className="text-gray-600 text-right">{web_page ? <a href={web_page} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{web_page}</a> : "N/A"}</p>
            </div>
          </div>
          <div>
            <div className="divider text-md font-semibold mt-6">Achievements</div>
            {achievements && achievements.length > 0 && (
              <div className="flex flex-wrap justify-center gap-y-2 gap-x-4 mt-2">
                {achievements.map(({name, url}, index) => (
                  <div className="tooltip" data-tip={name} key={index}>
                    <img alt={`Achievement ${name}`} className="w-12 h-12" src={url} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="indicator-item indicator-bottom indicator-center flex justify-center gap-7">
        {isConsumer && (
          isFollowing ? (
            <button
              className="btn glass btn-outline btn-error btn-sm flex items-center gap-1"
              onClick={() => alert("Unfollow feature is not implemented yet!")}
            >
              <svg
                className="size-[1.2em]"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Following</span>
            </button>
          ) : (
            <button
              className="btn glass btn-outline btn-error btn-sm flex items-center gap-1"
              onClick={handleFollowClick}
            >
              <svg
                className="size-[1.2em]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Follow</span>
            </button>
          )
        )}
        <button className="btn glass btn-outline btn-info btn-sm" onClick={handleOnCardClick}>View</button>
      </div>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { RestaurantCard };
