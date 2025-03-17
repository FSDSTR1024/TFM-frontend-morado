/********************************************* Import all individual APIs *********************************************/
import { authAPI } from "./auth.js";
import { axiosInstance } from "./axios.js";
import { cloudinaryAPI } from "./cloudinary.js";
import { dishAPI } from "./dish.js";
import { reviewAPI } from "./review.js";
import { userAPI } from "./user.js";

/********************************************* Named exports (ES module) **********************************************/
export { authAPI, axiosInstance, cloudinaryAPI, dishAPI, reviewAPI, userAPI };
