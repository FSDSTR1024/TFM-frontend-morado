/*********************************************** External Node modules ************************************************/
import { useContext } from "react";

/********************************************** Internal library imports **********************************************/
import { AuthContext } from "/src/contexts";

/************************************************** Hook Definition ***************************************************/
const useLogout = () => {
  const { setToken } = useContext(AuthContext);

  const logout = () => setToken(null);

  return { logout };
};

/********************************************** Named export (ES module) **********************************************/
export { useLogout };
