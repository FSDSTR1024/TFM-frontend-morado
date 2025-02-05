/*********************************************** External Node modules ************************************************/
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { AuthContext } from "/src/contexts/AuthContext";
import { useLogout } from "/src/hooks/useLogout";

/************************************************ Component Definition ************************************************/
const LogoutButton = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleLogout = useCallback(() => {
    logout();
    setToken(null);
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
