/*********************************************** External Node modules ************************************************/
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { useLogout } from "/src/hooks/useLogout";

/************************************************ Component Definition ************************************************/
const LogoutButton = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
    document.getElementById("on_logout_modal").showModal();
  }, []);

  return (
    <button className="btn btn-sm btn-error btn-outline" onClick={handleLogout}>
      Logout
    </button>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { LogoutButton };
