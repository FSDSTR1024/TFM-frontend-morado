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

/********************************************** Named export (ES module) **********************************************/
export { getImgURL, getUserImgURL, roundImg };
