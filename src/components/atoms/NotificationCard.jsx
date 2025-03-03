/************************************************ Node modules needed ************************************************/
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/************************************************* Internal libraries *************************************************/
import { useDateTime } from "/src/hooks";

/************************************************ Component Definition ************************************************/
const NotificationCard = ({ notification }) => {
  const { getDateTimeStr } = useDateTime();
  const navigate = useNavigate();

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
      <p className="text-gray-400 text-xs text-right">{getDateTimeStr(notification.datetime)}</p>
      <h1 className="text-center text-lg text-secondary font-bold mb-2">Stay tuned!</h1>
      <p className="text-gray-400 text-sm">
        The &quot;
        <span className="text-blue-500 cursor-pointer" onClick={handleRestaurantNameClick}>
          {notification.restaurant.name}
        </span>
        &quot; restaurant that you&apos;re following has published a new dish:
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
