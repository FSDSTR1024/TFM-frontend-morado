/************************************************* Internal libraries *************************************************/
import { notActiveUserImgUrl, notDefinedImgUrl } from "/src/constants";

/*********************************************** Utilities definitions ************************************************/
const getImgURL = ({ img_url }) => {
  return img_url ? img_url : notDefinedImgUrl;
};

const getUserImgURL = ({ img_url, is_activated }) => {
  return is_activated ? getImgURL({img_url}) : notActiveUserImgUrl;
};

const roundImg = ({ imgURL, radius = "max" }) => {
  const regEx = /(.*\/image\/upload\/)(.*)(\/v\d+\/.*)/;
  return imgURL.replace(regEx, `$1$2/r_${radius}$3`);
};

const tramsformCloudinaryURL = ({ url }) => {
  const regEx = /(.*\/image\/upload\/)(v\d+\/.*)/;
  return url.replace(regEx, `$1ar_1:1,c_auto,g_auto/$2`);
};

/********************************************** Named export (ES module) **********************************************/
export { getImgURL, getUserImgURL, roundImg, tramsformCloudinaryURL };
