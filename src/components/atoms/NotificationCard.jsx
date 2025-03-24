/************************************************ Node modules needed ************************************************/
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/************************************************* Internal libraries *************************************************/
import { AuthContext, NotificationsContext, WebSocketContext } from "/src/contexts";
import { useTimestamp } from "/src/hooks";

/********************************************** Subcomponents Definition **********************************************/
const NewDishNoti = memo(({ dish, handleDishNameClick, handleRestaurantNameClick, restaurant }) => (
  <>
    <h1 className="text-center text-lg text-secondary font-bold mb-2">Stay tuned!</h1>
    <p className="text-gray-400 text-sm">
      The &quot;
      <span className="text-blue-500 cursor-pointer" onClick={handleRestaurantNameClick}>
        {restaurant.name}
      </span>
      &quot; restaurant (that you&apos;re currently following) has published a new dish:
    </p>
    <h2 className="text-center text-base font-semibold mt-2">
      <span className="text-blue-500 cursor-pointer" onClick={handleDishNameClick}>
        {dish.name}
      </span>
    </h2>
  </>
));

const NewFollowerNoti = memo(({ consumer, handleConsumerNameClick }) => (
  <>
    <h1 className="text-center text-lg text-secondary font-bold mb-2">Yee-Ha!</h1>
    <p className="text-gray-400 text-sm">
      <span className="text-base font-semibold text-blue-500 cursor-pointer" onClick={handleConsumerNameClick}>
        {consumer.name} {consumer.surname}
      </span>
      &nbsp;consumer has started to follow your restaurant!
    </p>
  </>
));

const NewReviewNoti = memo(({ consumer, dish, handleConsumerNameClick, handleDishNameClick, review }) => (
  <>
    {review.rating <= 3 ? (
      <h1 className="text-center text-lg text-secondary font-bold mb-2">Oops...</h1>
    ) : (
      review.rating <= 7 ? (
        <h1 className="text-center text-lg text-secondary font-bold mb-2">News!</h1>
      ) : (
        <h1 className="text-center text-lg text-secondary font-bold mb-2">Extraordinary!</h1>
      )
    )}
    <p className="text-gray-400 text-sm">
      <span className="text-base font-semibold text-blue-500 cursor-pointer" onClick={handleConsumerNameClick}>
        {consumer.name} {consumer.surname}
      </span>
      &nbsp;consumer has reviewed your &quot;
      <span className="text-base font-semibold text-green-700 cursor-pointer" onClick={handleDishNameClick}>
        {dish.name}
      </span>
      &quot; dish plate with a rating of <strong>{review.rating}</strong> points.
    </p>
  </>
));

/************************************************ Component Definition ************************************************/
const NotificationCard = ({ notification }) => {
  const { deleteNotification } = useContext(NotificationsContext);
  const { getTimestampStr } = useTimestamp();
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { wsUpdateUserProfile } = useContext(WebSocketContext);

  const [notificationKind, setNotificationKind] = useState(null);
  useEffect(() => {
    if (loggedUser?.role === "consumers") {
      setNotificationKind("newDish");
    } else {
      setNotificationKind(notification.kind);
    }
  }, [loggedUser]);

  const handleDeleteNotification = useCallback(async () => {
    document.getElementById("on_loading_modal").showModal();
    await deleteNotification(notification.hash);
    wsUpdateUserProfile();
    document.getElementById("on_loading_modal").close();
  }, [notification]);

  const handleConsumerNameClick = useCallback(() => {
    navigate(`/consumers/${notification.consumer._id}`);
    window.location.reload();
  }, [notification]);

  const handleDishNameClick = useCallback(() => {
    navigate(`/dishes/${notification.dish._id}`);
    window.location.reload();
  }, [notification]);

  const handleRestaurantNameClick = useCallback(() => {
    navigate(`/restaurants/${notification.restaurant._id}`);
    window.location.reload();
  }, [notification]);

  return (
    <div className="border card bg-base-200 px-3 py-2 w-64">
      <div className="flex justify-between items-center mb-1">
        <p className="text-gray-400 text-xs">{getTimestampStr(notification.timestamp)}</p>
        <button className="btn btn-xs btn-outline btn-error flex items-center gap-1" onClick={handleDeleteNotification}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Delete
        </button>
      </div>
      {notificationKind === "newDish" && (
        <NewDishNoti
          handleDishNameClick={handleDishNameClick}
          handleRestaurantNameClick={handleRestaurantNameClick}
          {...notification}
        />
      )}
      {notificationKind === "newFollower" && (
        <NewFollowerNoti
          handleConsumerNameClick={handleConsumerNameClick}
          {...notification}
        />
      )}
      {notificationKind === "newReview" && (
        <NewReviewNoti
          handleConsumerNameClick={handleConsumerNameClick}
          handleDishNameClick={handleDishNameClick}
          {...notification}
        />
      )}
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { NotificationCard };
