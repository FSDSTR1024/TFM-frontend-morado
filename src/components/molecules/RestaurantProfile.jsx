/************************************************ Node modules needed ************************************************/
import { useCallback, useContext, useEffect, useState } from "react";

/********************************************** Internal library imports **********************************************/
import { AuthContext } from "/src/contexts";
import { ChangeProfilePictureButton, DishCard, Loading, ModalOnWrongFileType, StarRating } from "/src/components/atoms";
import { dishAPI } from "/src/api";
import { getUserImgURL } from "/src/utils";
import { Logger } from "/src/utils";
import { ModalOnRestaurantEdit } from "/src/components/molecules";
import { TextParagraph } from "/src/components/protons";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("RestaurantProfile");

/************************************************ Component Definition ************************************************/
const RestaurantProfile = () => {
  const { loggedUser } = useContext(AuthContext);

  const handleAddDishClick = useCallback(() => {
    console.log("Add dish clicked");
  }, [loggedUser]);

  const handleChangeCredentialsClick = useCallback(() => {
    console.log("Change credentials clicked");
  }, []);

  const handleDeleteAccountClick = useCallback(() => {
    console.log("Delete account clicked");
  }, []);

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

  const [restaurantDishes, setRestaurantDishes] = useState([]);
  useEffect(() => {
    const getRestaurantDishes = async () => {
      try {
        const { restaurantDishes } = await dishAPI.getDishesByRestaurantId({ restaurantId: loggedUser._id });
        setRestaurantDishes(restaurantDishes);
      } catch (error) {
        setRestaurantDishes([]);
        const errorText = "There was an error while trying to fetch the Restaurant dishes!";
        logger.error(errorText, error);
      }
    };

    getRestaurantDishes();
  }, [loggedUser]);

  return !loggedUser ? (
    <Loading />
  ) : (
    <>
      <ModalOnRestaurantEdit editableFields={editableFields} {...loggedUser} />
      <ModalOnWrongFileType />
      <div className="container mx-auto p-6">
        <div className="bg-base-100 shadow-xl rounded-lg p-6 mb-6">
          <div className="flex justify-between gap-6">
            <div className="flex flex-col justify-start items-center gap-2 w-96">
              <img alt={loggedUser.name} className="w-60 h-60 rounded-lg" src={getUserImgURL({ ...loggedUser })} />
              <ChangeProfilePictureButton />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <h1 className="text-4xl font-bold">{loggedUser.name}</h1>
                <StarRating textSize="lg" {...loggedUser} />
              </div>
              <p className="text-lg text-gray-600 mb-2">📍 {loggedUser.location}</p>
              {loggedUser.description && (
                <div className="mb-2 text-xl text-gray-400">
                  <TextParagraph text={loggedUser.description} />
                </div>
              )}
              <div className="divider text-xl font-semibold mt-6 mb-3">Contact Information</div>
              <div className="mb-2">
                <span className="text-lg text-gray-400 font-semibold">📧 Email: </span>
                <span className="text-lg text-gray-600">{loggedUser.email}</span>
              </div>
              <div className="mb-2">
                <span className="text-lg text-gray-400 font-semibold">📞 Phone: </span>
                <span className="text-lg text-gray-600">{loggedUser.phone}</span>
              </div>
              <div>
                <span className="text-lg text-gray-400 font-semibold">🌐 Website: </span>
                <span className="text-lg text-gray-600">
                  <a href={loggedUser.web_page} className="text-blue-500 underline">
                    {loggedUser.web_page}
                  </a>
                </span>
              </div>
              <div className="divider text-xl font-semibold mt-6 mb-5">Actions</div>
              <div className="flex gap-3 justify-evenly">
                <button className="btn btn-primary btn-outline" onClick={handleAddDishClick}>
                  Add Dish
                </button>
                <button className="btn btn-secondary btn-outline" onClick={handleEditProfileClick}>
                  Edit Profile
                </button>
                <button className="btn btn-accent btn-outline" onClick={handleChangeCredentialsClick}>
                  Change Credentials
                </button>
                <button className="btn btn-error btn-outline" onClick={handleDeleteAccountClick}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-base-200 shadow-xl rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-4">Dishes</h2>
          <div className="flex flex-wrap justify-evenly gap-y-8 mb-2">
            {restaurantDishes.length === 0 ? (
              <p className="text-lg text-gray-400">No dishes found for this restaurant.</p>
            ) : (
              restaurantDishes.map((dish) => (
                <DishCard key={dish._id} {...dish} />
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
