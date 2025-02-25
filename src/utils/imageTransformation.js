/*********************************************** Utilities definitions ************************************************/
const roundImg = ({ imgURL, radius = "max" }) => {
  const regEx = /(.*\/image\/upload\/)(.*)(\/v\d+\/.*)/;
  return imgURL.replace(regEx, `$1$2/r_${radius}$3`);
}

/********************************************** Named export (ES module) **********************************************/
export { roundImg };
