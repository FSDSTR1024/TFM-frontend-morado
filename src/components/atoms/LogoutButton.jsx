/*********************************************** External Node modules ************************************************/
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { useLogout } from "/src/hooks/useLogout";
import { WebSocketContext } from "/src/contexts";

/************************************************ Component Definition ************************************************/
const LogoutButton = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { wsLogoutUser } = useContext(WebSocketContext);

  const handleLogout = useCallback(() => {
    wsLogoutUser();
    logout();
    navigate("/");
    document.getElementById("on_logout_modal").showModal();
  }, [wsLogoutUser]);

  return (
    <button className="btn btn-sm btn-error btn-outline" onClick={handleLogout}>
      Logout
    </button>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { LogoutButton };
