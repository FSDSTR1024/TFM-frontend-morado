/*********************************************** External Node modules ************************************************/
import { useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";

/********************************************** Internal library imports **********************************************/
import { AuthContext, WebSocketContext } from "/src/contexts";
import { FormField } from "/src/components/atoms";
import { FormFieldError } from "/src/components/protons";
import { useRegister } from "/src/hooks";

/************************************************ Component Definition ************************************************/
const ModalOnReview = ({ dishId }) => {
  const { loggedUser } = useContext(AuthContext);
  const { wsUpdateUserProfile } = useContext(WebSocketContext);

  const editableFields = [
    { name: "rating", text: "Rating (0 ~ 10)", type: "number" },
    { name: "comment", required: false, text: "Comment", type: "textarea" }
  ];

  const { error, registerReview } = useRegister();
    const { formState, handleSubmit, register } = useForm({
      defaultValues: editableFields.reduce((accumulator, field) => {
        accumulator[field.name] = field.default ? field.default : "";
        return accumulator;
      }, {})
    });

    const closeModal = useCallback(() => {
      document.getElementById(`on_${dishId}_rating_modal`).close();
    }, []);

    const [submitForm, setSubmitForm] = useState(false);
    const handleOnCancelButton = useCallback(async () => {
      setSubmitForm(false);
      closeModal();
    }, []);
    const handleOnSubmit = useCallback(async (formData) => {
      if (submitForm) {
        const newReviewID = await registerReview({ ...formData, dish: dishId, user: loggedUser._id });
        if (newReviewID) {
          closeModal();
          wsUpdateUserProfile();
          window.location.reload();
        }
      }
    }, [registerReview, submitForm]);

  return (
    <dialog className="modal" id={`on_${dishId}_rating_modal`}>
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-2xl text-info text-center">Rating the dish...</h3>
        <form className="flex flex-col items-center" id="dish_review_form" onSubmit={handleSubmit(handleOnSubmit)}>
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
export { ModalOnReview };
