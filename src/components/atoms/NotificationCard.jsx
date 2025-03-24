/************************************************ Node modules needed ************************************************/
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

/************************************************* Internal libraries *************************************************/
import { NotificationsContext, WebSocketContext } from "/src/contexts";
import { useTimestamp } from "/src/hooks";

/************************************************ Component Definition ************************************************/
const NotificationCard = ({ notification }) => {
  const { deleteNotification } = useContext(NotificationsContext);
  const { getTimestampStr } = useTimestamp();
  const navigate = useNavigate();
  const { wsUpdateUserProfile } = useContext(WebSocketContext);

  const handleDeleteNotification = useCallback(async () => {
    await deleteNotification(notification.hash);
    wsUpdateUserProfile();
  }, [notification]);

  const handleDishNameClick = useCallback(() => {
    navigate(`/dishes/${notification.dish._id}`);
  }, [notification]);

  const handleRestaurantNameClick = useCallback(() => {
    navigate(`/restaurants/${notification.restaurant._id}`);
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
      <h1 className="text-center text-lg text-secondary font-bold mb-2">Stay tuned!</h1>
      <p className="text-gray-400 text-sm">
        The &quot;
        <span className="text-blue-500 cursor-pointer" onClick={handleRestaurantNameClick}>
          {notification.restaurant.name}
        </span>
        &quot; restaurant (that you&apos;re currently following) has published a new dish:
      </p>
      <h2 className="text-center text-base font-semibold mt-2">
        <span className="text-blue-500 cursor-pointer" onClick={handleDishNameClick}>
          {notification.dish.name}
        </span>
      </h2>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { NotificationCard };
