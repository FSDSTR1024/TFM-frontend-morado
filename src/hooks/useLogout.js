/************************************************** Hook Definition ***************************************************/
const useLogout = () => {
  const logout = () => localStorage.removeItem("token");
  return { logout };
};

/********************************************** Named export (ES module) **********************************************/
export { useLogout };
