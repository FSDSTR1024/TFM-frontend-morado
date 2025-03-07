/********************************************** Internal library imports **********************************************/
import { CLOUDINARY_URL } from "/src/constants";
import { tramsformCloudinaryURL } from "/src/utils";

/************************************************** User APIs object **************************************************/
const cloudinaryAPI = {
  uploadImage: async ({ uploadData }) => {
    const response = await fetch(`${CLOUDINARY_URL}/image/upload`, { body: uploadData, method: "POST" });
    const jsonData = await response.json();
    return tramsformCloudinaryURL({ ...jsonData });
  }
};

/********************************************* Named exports (ES module) **********************************************/
export { cloudinaryAPI };
