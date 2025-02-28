/********************************************* Import all individual APIs *********************************************/
import { authAPI } from "./auth.js";
import { axiosInstance } from "./axios.js";
import { dishAPI } from "./dish.js";
import { userAPI } from "./user.js";

/********************************************* Named exports (ES module) **********************************************/
export { authAPI, axiosInstance, dishAPI, userAPI };
