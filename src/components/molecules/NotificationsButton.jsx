/*********************************************** External Node modules ************************************************/
import { useCallback, useContext, useEffect, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { NotificationCard } from "/src/components/atoms";
import { NotificationsContext, WebSocketContext } from "/src/contexts";

/************************************************ Component Definition ************************************************/
const NotificationsButton = () => {
  const { deleteAllNotifications, notifications } = useContext(NotificationsContext);
  const { wsUpdateUserProfile } = useContext(WebSocketContext);

  const [userNotifications, setUserNotifications] = useState([]);
  useEffect(() => {
    const sortedNotifications = notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setUserNotifications(sortedNotifications);
  }, [notifications]);

  const handleDeleteAllNotifications = useCallback(async () => {
    document.getElementById("on_loading_modal").showModal();
    await deleteAllNotifications();
    wsUpdateUserProfile();
    document.getElementById("on_loading_modal").close();
  }, []);

  return (
    <div className="dropdown dropdown-end">
      <div className="btn btn-circle btn-ghost" role="button" tabIndex={0}>
        <div className="indicator">
          {userNotifications.length > 0 && <span className="badge badge-xs badge-secondary indicator-item">{userNotifications.length}</span>}
          <svg
            className="h-6 w-6"
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
        {userNotifications.length === 0 ? (
          <li className="border card bg-base-200 px-3 py-2 w-64 text-center text-gray-400 cursor-default">There are no new notifications...</li>
        ) : (
          <>
            <button
              className="btn btn-outline btn-error btn-sm flex items-center gap-1 w-full rounded-box mb-1"
              onClick={handleDeleteAllNotifications}
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
                  d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6m3 0h10m-7 4v6m4-6v6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Delete All</span>
            </button>
            {userNotifications.map((notification, index) => (
              <li key={index}>
                <NotificationCard notification={notification} />
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { NotificationsButton };
