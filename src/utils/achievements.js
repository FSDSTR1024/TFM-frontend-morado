/************************************************* Internal libraries *************************************************/
import { achievementImgUrls } from "/src/constants";

/*********************************************** Utilities definitions ************************************************/
const getConsumerAchievements = ({ createdAt, reviewed_dishes }) => {
  let achievements = [];
  if (new Date(createdAt) <= new Date().setFullYear(new Date().getFullYear() - 1)) {
    achievements.push(achievementImgUrls["1 year of membership"]);
  }
  if (reviewed_dishes >= 1) {
    achievements.push(achievementImgUrls["Review 1 dish"]);
  }
  if (reviewed_dishes >= 10) {
    achievements.push(achievementImgUrls["Review 10 dishes"]);
  }
  return achievements;
};

const getRestaurantAchievements = ({ createdAt, dishes, nrOfDishes }) => {
  let achievements = [];
  if (new Date(createdAt) <= new Date().setFullYear(new Date().getFullYear() - 1)) {
    achievements.push(achievementImgUrls["1 year of membership"]);
  }
  if (nrOfDishes >= 1) {
    achievements.push(achievementImgUrls["Publish 1 dish"]);
  }
  if (nrOfDishes >= 5) {
    achievements.push(achievementImgUrls["Publish 5 dishes"]);
  }
  if (dishes.some((dish) => new Date(dish.createdAt).getHours() >= 22 || new Date(dish.createdAt).getHours() <= 2)) {
    achievements.push(achievementImgUrls["Publish a dish at night (from 22:00 to 02:00)"]);
  }
  if (
    dishes.reduce((acc, dish) => {
      acc += dish.nrOfReviews >= 1 ? 1 : 0;
      return acc;
    }, 0) >= 1
  ) {
    achievements.push(achievementImgUrls["Have 1 dish review"]);
  }
  if (
    dishes.reduce((acc, dish) => {
      acc += dish.nrOfReviews >= 1 ? 1 : 0;
      return acc;
    }, 0) >= 5
  ) {
    achievements.push(achievementImgUrls["Have 5 dishes reviews"]);
  }
  return achievements;
};

/********************************************** Named export (ES module) **********************************************/
export { getConsumerAchievements, getRestaurantAchievements };
