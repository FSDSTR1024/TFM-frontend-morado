/************************************************ Node modules needed ************************************************/
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { AuthContext } from "/src/contexts";
import { ChangeProfilePictureButton, DishCard, Loading, ModalOnWrongFileType, StarRating } from "/src/components/atoms";
import { dishAPI, userAPI } from "/src/api";
import { getUserImgURL } from "/src/utils";
import { Logger } from "/src/utils";
import { ModalOnDishAdd, ModalOnRestaurantEdit } from "/src/components/molecules";
import { TextParagraph } from "/src/components/protons";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("RestaurantProfile");

/************************************************ Component Definition ************************************************/
const RestaurantProfile = ({ restaurantId }) => {
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoggedRestaurant, setIsLoggedRestaurant] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const { restaurant } = await userAPI.getRestaurantById(restaurantId);
        setRestaurant(restaurant);
      } catch (error) {
        setRestaurant(null);
        const errorText = "There was an error while trying to fetch the Restaurant user!";
        logger.error(errorText, error);
      }
    };

    if (loggedUser?._id === restaurantId) {
      setRestaurant(loggedUser);
      setIsLoggedRestaurant(true);
    } else {
      getRestaurant();
      setIsLoggedRestaurant(false);
    }
  }, [loggedUser, restaurantId]);

  const [restaurantDishes, setRestaurantDishes] = useState([]);
  useEffect(() => {
    const getRestaurantDishes = async () => {
      try {
        const { restaurantDishes } = await dishAPI.getDishesByRestaurantId(restaurant._id);
        setRestaurantDishes(restaurantDishes);
      } catch (error) {
        setRestaurantDishes([]);
        const errorText = "There was an error while trying to fetch the Restaurant dishes!";
        logger.error(errorText, error);
      }
    };

    if (restaurant) {
      getRestaurantDishes();
    }
  }, [restaurant]);

  const handleAddDishClick = useCallback(() => {
    document.getElementById("on_dish_add_modal").showModal();
  }, []);

  const [isLoadingDelete, setIsLoadingDelete] = useState(true);
  const handleDeleteAccountClick = useCallback(async () => {
    if (!isLoggedRestaurant) return;
    if (confirm("Are you sure you want to delete this restaurant account?") === true) {
      if (confirm("This will be FOREVER. There will not be any going back, or CTRL+Z. Are you REALLY sure?") === true) {
        document.getElementById("on_loading_modal").showModal();
        try {
          await userAPI.deleteUser(loggedUser._id, loggedUser.role);
          setIsLoadingDelete(false);
          navigate("/");
        } catch (error) {
          const errorText = `Restaurant user ${loggedUser._id} could not be deleted!`;
          logger.error(errorText, error);
        }
      }
    }
  }, [isLoggedRestaurant, loggedUser]);

  useEffect(() => {
    if (!isLoadingDelete) {
      document.getElementById("on_loading_modal").close();
    }
  }, [isLoadingDelete]);

  const handleEditProfileClick = useCallback(() => {
    document.getElementById("on_restaurant_edit_modal").showModal();
  }, []);

  const editableFields = [
    { name: "name", text: "Name" },
    { name: "description", required: false, text: "Description", type: "textarea" },
    { name: "location", text: "Location" },
    { name: "phone", required: false, text: "Phone" },
    { name: "web_page", required: false, text: "Web Page" }
  ];

  const maxBestDishes = 3;
  return !restaurant ? (
    <Loading />
  ) : (
    <>
      {isLoggedRestaurant && (
        <>
          <ModalOnDishAdd {...restaurant} />
          <ModalOnRestaurantEdit editableFields={editableFields} {...restaurant} />
          <ModalOnWrongFileType />
        </>
      )}
      <div className="container mx-auto p-6">
        <div className="bg-base-100 shadow-xl rounded-lg p-6 mb-6">
          <div className="flex justify-between gap-6">
            <div className="flex flex-col justify-start items-center gap-2 w-96">
              <img alt={restaurant.name} className="w-60 h-60 rounded-lg" src={getUserImgURL({ ...restaurant })} />
              {isLoggedRestaurant && <ChangeProfilePictureButton />}
            </div>
            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <h1 className="text-4xl font-bold">{restaurant.name}</h1>
                <StarRating {...restaurant} />
              </div>
              <p className="text-lg text-gray-600 mb-2">📍 {restaurant.location}</p>
              {restaurant.description && (
                <div className="mb-2 text-xl text-gray-400">
                  <TextParagraph text={restaurant.description} />
                </div>
              )}
              <div className="divider text-xl font-semibold mt-6 mb-3">Contact Information</div>
              <div className="mb-2">
                <span className="text-lg text-gray-400 font-semibold">📧 Email: </span>
                <span className="text-lg text-gray-600">{restaurant.email}</span>
              </div>
              <div className="mb-2">
                <span className="text-lg text-gray-400 font-semibold">📞 Phone: </span>
                <span className="text-lg text-gray-600">{restaurant.phone}</span>
              </div>
              <div>
                <span className="text-lg text-gray-400 font-semibold">🌐 Website: </span>
                <span className="text-lg text-gray-600">
                  <a href={restaurant.web_page} className="text-blue-500 underline">
                    {restaurant.web_page}
                  </a>
                </span>
              </div>
              {isLoggedRestaurant && (
                <>
                  <div className="divider text-xl font-semibold mt-6 mb-5">Actions</div>
                  <div className="flex justify-evenly">
                    <button className="btn btn-primary btn-outline" onClick={handleAddDishClick}>
                      Add Dish
                    </button>
                    <button className="btn btn-secondary btn-outline" onClick={handleEditProfileClick}>
                      Edit Profile
                    </button>
                    <button className="btn btn-error btn-outline" onClick={handleDeleteAccountClick}>
                      Delete Account
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {restaurantDishes.length !== 0 && (
          <div className="bg-base-200 shadow-xl rounded-lg p-6 mb-6">
            <h2 className="text-3xl font-bold mb-4">Best Dishes</h2>
            <div className="flex flex-wrap justify-evenly gap-y-8 mb-2">
              {restaurantDishes.sort((a, b) => b.rating - a.rating).slice(0, maxBestDishes).map((dish) => (
                <DishCard key={dish._id} {...dish} />
              ))}
            </div>
          </div>
        )}
        <div className="bg-base-200 shadow-xl rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-4">All Dishes</h2>
          <div className="flex flex-wrap justify-evenly gap-y-8 mb-2">
            {restaurantDishes.length === 0 ? (
              <p className="text-lg text-gray-400">No dishes found for this restaurant.</p>
            ) : (
              restaurantDishes.map((dish, index) => (
                <DishCard isTheNewest={index === restaurantDishes.length - 1} key={dish._id} {...dish} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { RestaurantProfile };
