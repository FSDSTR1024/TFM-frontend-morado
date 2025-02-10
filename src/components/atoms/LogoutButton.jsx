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
    alert("[SUCCESS] User logged out successfully!");
    navigate("/");
    window.location.reload();
  }, []);

  return (
    <button className="btn btn-sm btn-error btn-outline" onClick={handleLogout}>
      Logout
    </button>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { LogoutButton };
