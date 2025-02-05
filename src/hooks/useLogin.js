/********************************************** Internal library imports **********************************************/
import { Logger } from "/src/utils/Logger.js";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("useLogin");

/************************************************** Hook Definition ***************************************************/
const useLogin = () => {
  const logger = new Logger("useLogin");

  const login = async (credentials) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/login`, {
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
        method: "POST"
      });
      const json = await response.json();
      if (!json.error) {
        localStorage.setItem("token", json.data);
      }
      return json;
    } catch (error) {
      const errorText = "There was an error while trying to log in!";
      logger.error(errorText, error);
      return { error: errorText };
    }
  };

  return { login };
};

/********************************************** Named export (ES module) **********************************************/
export { useLogin };
