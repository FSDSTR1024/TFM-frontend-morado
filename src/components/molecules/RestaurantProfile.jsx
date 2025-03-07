/************************************************ Node modules needed ************************************************/
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { AuthContext } from "/src/contexts";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "/src/constants";
import { getUserImgURL } from "/src/utils";
import { Loading, ModalOnWrongFileType, StarRating } from "/src/components/atoms";
import { ModalOnRestaurantEdit } from "/src/components/molecules";
import { cloudinaryAPI, userAPI } from "/src/api";

/************************************************ Component Definition ************************************************/
const RestaurantProfile = () => {
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddDishClick = useCallback(() => {
    navigate(`/restaurants/${loggedUser._id}/add-dish`);
  }, [loggedUser]);

  const handleEditClick = useCallback(() => {
    document.getElementById("on_restaurant_edit_modal").showModal();
  }, []);

  const handleProfilePicChange = useCallback(async (fileToUpload) => {
    if (!fileToUpload.type.startsWith("image/")) {
      document.getElementById("on_wrong_file_type_modal").showModal();
      document.getElementById("profilePictureInput").value = "";
      return;
    }

    // Prepare the form data to upload the image to Cloudinary
    const uploadData = new FormData();
    uploadData.append("file", fileToUpload);
    uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);  /* Preset name in Cloudinary */
    uploadData.append("cloud_name", CLOUDINARY_CLOUD_NAME);  /* User name in Cloudinary */

    // Upload the image to Cloudinary
    const img_url = await cloudinaryAPI.uploadImage({ uploadData});

    // Update the user profile picture in the database
    await userAPI.updateRestaurantProfilePicture({ img_url, restaurantId: loggedUser._id });
  }, [loggedUser]);

  return !loggedUser ? (
    <Loading />
  ) : (
    <>
      <ModalOnRestaurantEdit {...loggedUser} />
      <ModalOnWrongFileType />
      <div className="container mx-auto p-6">
        <div className="bg-base-100 shadow-xl rounded-lg p-6 mb-6">
          <div className="flex justify-between gap-6">
            <div className="flex flex-col justify-start items-center gap-2 w-96">
              <img alt={loggedUser.name} className="w-60 h-60 rounded-lg" src={getUserImgURL({ ...loggedUser })} />
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Change profile picture</legend>
                <input
                  accept="image/*"
                  className="file-input file-input-xs"
                  id="profilePictureInput"
                  onChange={(e) => handleProfilePicChange(e.target.files[0])}
                  type="file"
                />
              </fieldset>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <h1 className="text-4xl font-bold">{loggedUser.name}</h1>
                <StarRating textSize="lg" {...loggedUser} />
              </div>
              <p className="text-lg text-gray-600 mb-2">📍 {loggedUser.location}</p>
              <p className="text-xl text-gray-400 mb-2">{loggedUser.description}</p>
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
              <div className="divider text-xl font-semibold mt-6 mb-3">Actions</div>
              <div className="flex gap-3 justify-evenly">
                <button className="btn btn-primary btn-outline" onClick={handleChangeCredentialsClick}>
                  Change Credentials
                </button>
                <button className="btn btn-secondary btn-outline" onClick={handleEditProfileClick}>
                  Edit Profile
                </button>
                <button className="btn btn-accent btn-outline" onClick={handleAddDishClick}>
                  Add Dish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { RestaurantProfile };
