/*********************************************** External Node modules ************************************************/
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

/********************************************** Internal library imports **********************************************/
import { dishAPI } from "/src/api";
import { FormField } from "/src/components/atoms";
import { FormFieldError } from "/src/components/protons";
import { useRegister } from "/src/hooks";
import { WebSocketContext } from "/src/contexts";

/************************************************ Component Definition ************************************************/
const ModalOnDishEdit = ({ ...dish }) => {
  const { wsUpdateUserProfile } = useContext(WebSocketContext);

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
  const { formState, handleSubmit, register, reset } = useForm({
    defaultValues: editableFields.reduce((accumulator, field) => {
      accumulator[field.name] = dish[field.name];
      return accumulator;
    }, {})
  });

  const [isDishAvailable, setIsDishAvailable] = useState(false);
  useEffect(() => {
    if (dish._id) {
      setIsDishAvailable(true);
    }
  }, [dish]);

  useEffect(() => {
    if (isDishAvailable) {
      reset({ ...dish });
    }
  }, [isDishAvailable]);

  const closeModal = useCallback(() => {
    document.getElementById("on_dish_edit_modal").close();
  }, []);

  const [submitForm, setSubmitForm] = useState(false);
  const handleOnCancelButton = useCallback(async () => {
    setSubmitForm(false);
    closeModal();
  }, []);
  const handleOnSubmit = useCallback(async (formData) => {
    if (submitForm) {
      document.getElementById("on_loading_modal").showModal();
      await dishAPI.updateDish({ ...dish, ...formData });
      closeModal();
      wsUpdateUserProfile();
      window.location.reload();
      document.getElementById("on_loading_modal").close();
    }
  }, [submitForm, wsUpdateUserProfile]);

  return (
    <dialog className="modal" id="on_dish_edit_modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-2xl text-info text-center">Editing the dish...</h3>
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
            <div className="flex justify-center gap-6">
              <button className="btn btn-md btn-success mt-6 w-full text-base" onClick={() => setSubmitForm(true)} type="submit">Save</button>
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
export { ModalOnDishEdit };
