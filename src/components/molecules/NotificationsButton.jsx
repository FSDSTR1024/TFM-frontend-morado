/*********************************************** External Node modules ************************************************/
import { useCallback, useContext } from "react";

/********************************************** Internal library imports **********************************************/
import { NotificationCard } from "/src/components/atoms";
import { NotificationsContext } from "/src/contexts";

/************************************************ Component Definition ************************************************/
const NotificationsButton = () => {
  const { notifications, setNewNotification, setToDeleteNotification } = useContext(NotificationsContext);

  const handleOnClick = useCallback(() => {
    const index = notifications.length + 1;
    setNewNotification({ datetime: new Date(), dish: { _id: "1234", name: `Platillo ${index}` }, restaurant: { _id: "1234", name: `Restaurante ${index}` } });
  }, [notifications]);

  const handleOnClick2 = useCallback(() => {
    setToDeleteNotification(notifications[0]?._id);
  }, [notifications]);

  return (
    <div>
      <button className="btn btn-accent btn-xs" onClick={handleOnClick}>
        +1
      </button>
      <button className="btn btn-error btn-xs mx-2" onClick={handleOnClick2}>
        -
      </button>
      <div className="dropdown dropdown-end">
        <div className="btn btn-circle btn-ghost" role="button" tabIndex={0}>
          <div className="indicator">
            {notifications.length > 0 && <span className="badge badge-xs badge-secondary indicator-item">{notifications.length}</span>}
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              {" "}
            </svg>
          </div>
        </div>
        <ul className="bg-base-200 dropdown-content flex flex-col items-center max-h-96 mt-1 overflow-y-auto shadow rounded-box z-10" tabIndex={0}>
          {notifications.length === 0 ? (
            <li className="border card bg-base-200 px-3 py-2 w-64 text-center text-gray-400">There are no new notifications...</li>
          ) : (
            notifications.map((notification, index) => (
              <li key={index}>
                <NotificationCard notification={notification} />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { NotificationsButton };
