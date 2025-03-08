/************************************************ Node modules needed ************************************************/
import { useCallback, useContext } from "react";

/********************************************** Internal library imports **********************************************/
import { AuthContext, WebSocketContext } from "/src/contexts";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "/src/constants";
import { cloudinaryAPI, userAPI } from "/src/api";

/************************************************ Component Definition ************************************************/
const ChangeProfilePictureButton = () => {
  const { loggedUser } = useContext(AuthContext);
  const { wsUpdateUserProfile } = useContext(WebSocketContext);

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
    const cloudinary_url = await cloudinaryAPI.uploadImage({ uploadData});

    // Update the user profile picture in the database
    await userAPI.updateProfilePicture({ ...loggedUser, img_url: cloudinary_url });
    wsUpdateUserProfile();
  }, [loggedUser, wsUpdateUserProfile]);

  return (
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
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ChangeProfilePictureButton };
