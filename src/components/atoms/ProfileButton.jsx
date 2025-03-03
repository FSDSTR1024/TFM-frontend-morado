/*********************************************** External Node modules ************************************************/
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { AuthContext } from "/src/contexts";

/************************************************ Component Definition ************************************************/
const ProfileButton = () => {
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOnClick = useCallback(() => {
    navigate("/profile", { state: { loggedUser } });
    window.location.reload();
  }, [loggedUser]);

  return (
    <button className="btn btn-sm btn-warning btn-outline" onClick={handleOnClick}>
      Profile
    </button>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ProfileButton };
