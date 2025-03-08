/*********************************************** External Node modules ************************************************/
import { useForm } from "react-hook-form";

/********************************************** Internal library imports **********************************************/
import { FormField } from "/src/components/atoms";
import { FormFieldError } from "/src/components/protons";
import { useCallback } from "react";

/************************************************ Component Definition ************************************************/
const ModalOnRestaurantEdit = ({ editableFields, ...loggedUser }) => {
  const { formState, handleSubmit, register } = useForm({
    defaultValues: editableFields.reduce((accumulator, field) => {
      accumulator[field.name] = loggedUser[field.name] ? loggedUser[field.name] : "";
      return accumulator;
    }, {})
  });

  const handleOnSubmit = useCallback(async (formData) => {
  }, [loggedUser]);

  return (
    <dialog className="modal" id="on_restaurant_edit_modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2">✕</button>
        </form>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col items-center">
          <div className="w-80">
            <div>
              {editableFields.map((field, index) => (
                <div key={index}>
                  <FormField formState={formState} register={register} {...field} />
                </div>
              ))}
            </div>
          </div>
          <button className="btn btn-primary mt-6 w-full text-base" type="submit">Sign up</button>
        </form>
      </div>
    </dialog>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ModalOnRestaurantEdit };
