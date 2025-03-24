/*********************************************** External Node modules ************************************************/
import { useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";

/********************************************** Internal library imports **********************************************/
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "/src/constants";
import { cloudinaryAPI } from "/src/api";
import { FormField } from "/src/components/atoms";
import { FormFieldError } from "/src/components/protons";
import { useRegister } from "/src/hooks";
import { WebSocketContext } from "/src/contexts";

/************************************************ Component Definition ************************************************/
const ModalOnDishAdd = ({ _id }) => {
  const { wsNewDishAdded } = useContext(WebSocketContext);

  const allergensList = [
    "celery",
    "crustaceans",
    "eggs",
    "fish",
    "gluten",
    "lupins",
    "milk",
    "mustard",
    "nuts",
    "peanuts",
    "sesame",
    "shellfish",
    "soya",
    "sulphites",
  ];

  const editableFields = [
    { name: "name", text: "Name" },
    { name: "description", required: false, text: "Description", type: "textarea" },
    { name: "price", step: 0.01, required: false, text: "Price (€)", type: "number" },
    { list: allergensList, name: "allergens", required: false, text: "Allergens", type: "checkbox" }
  ];

  const { error, registerDish } = useRegister();
  const { formState, handleSubmit, register } = useForm({
    defaultValues: editableFields.reduce((accumulator, field) => {
      accumulator[field.name] = "";
      return accumulator;
    }, {})
  });

  const closeModal = useCallback(() => {
    document.getElementById("on_dish_add_modal").close();
  }, []);

  const [submitForm, setSubmitForm] = useState(false);
  const handleOnCancelButton = useCallback(async () => {
    setSubmitForm(false);
    closeModal();
  }, []);
  const handleOnSubmit = useCallback(async (formData) => {
    if (submitForm) {
      const newDishID = await registerDish({ ...formData, img_url, restaurant: _id });
      if (newDishID) {
        closeModal();
        wsNewDishAdded();
        window.location.reload();
      }
    }
  }, [submitForm, registerDish]);

  const [img_url, setImage] = useState(null);
  const handleDishPicChange = useCallback(async (fileToUpload) => {
    if (!fileToUpload.type.startsWith("image/")) {
      document.getElementById("on_wrong_file_type_modal").showModal();
      document.getElementById("dishPictureInput").value = "";
      return;
    }

    // Prepare the form data to upload the image to Cloudinary
    const uploadData = new FormData();
    uploadData.append("file", fileToUpload);
    uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);  /* Preset name in Cloudinary */
    uploadData.append("cloud_name", CLOUDINARY_CLOUD_NAME);  /* User name in Cloudinary */

    // Upload the image to Cloudinary
    const cloudinary_url = await cloudinaryAPI.uploadImage({ uploadData});
    setImage(cloudinary_url);
  }, []);

  return (
    <dialog className="modal" id="on_dish_add_modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-2xl text-info text-center">Adding a new dish...</h3>
        <form className="flex flex-col items-center" id="dish_add_form" onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="w-80">
            <div>
              {editableFields.map((field, index) => (
                <div key={index}>
                  <FormField formState={formState} register={register} {...field} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            {img_url && (
              <img
                alt={`New food dish picture`}
                className="h-40 rounded-lg object-scale-down mt-4"
                src={img_url}
              />
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Picture</legend>
              <input
                accept="image/*"
                className="file-input file-input-xs"
                id="dishPictureInput"
                onChange={(e) => handleDishPicChange(e.target.files[0])}
                type="file"
              />
              <div className="flex flex-col items-end">
                <span className="badge badge-warning text-xs fieldset-label">Optional</span>
              </div>
            </fieldset>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex justify-center gap-6">
              <button className="btn btn-md btn-success mt-6 w-full text-base" onClick={() => setSubmitForm(true)} type="submit">Create</button>
              <button className="btn btn-md btn-error mt-6 w-full text-base" onClick={handleOnCancelButton}>Cancel</button>
            </div>
            {error && <FormFieldError error={{message: error}} />}
          </div>
        </form>
      </div>
    </dialog>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ModalOnDishAdd };
