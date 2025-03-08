/*********************************************** External Node modules ************************************************/
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

/********************************************** Internal library imports **********************************************/
import { FormField } from "/src/components/atoms";
import { FormFieldError } from "/src/components/protons";
import { useProfile } from "/src/hooks";

/************************************************ Component Definition ************************************************/
const ModalOnRestaurantEdit = ({ editableFields, ...loggedUser }) => {
  const { error, updateRestaurant } = useProfile();
  const { formState, handleSubmit, register } = useForm({
    defaultValues: editableFields.reduce((accumulator, field) => {
      accumulator[field.name] = loggedUser[field.name] ? loggedUser[field.name] : "";
      return accumulator;
    }, {})
  });

  const closeModal = useCallback(() => {
    document.getElementById("on_restaurant_edit_modal").close();
  }, []);

  const [submitForm, setSubmitForm] = useState(false);
  const handleOnCancelButton = useCallback(async () => {
    setSubmitForm(false);
    closeModal();
  }, []);
  const handleOnSubmit = useCallback(async (formData) => {
    if (submitForm) {
      const error = await updateRestaurant({ formData, loggedUser });
      if (!error) {
        closeModal();
      }
    }
  }, [loggedUser, submitForm]);

  return (
    <dialog className="modal" id="on_restaurant_edit_modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2">✕</button>
        </form>
        <form className="flex flex-col items-center" id="restaurant_edit_form" onSubmit={handleSubmit(handleOnSubmit)}>
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
export { ModalOnRestaurantEdit };
