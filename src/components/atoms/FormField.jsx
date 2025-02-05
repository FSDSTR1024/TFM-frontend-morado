/********************************************** Internal library imports **********************************************/
import { FormFieldError } from "/src/components/protons";

/************************************************ Component Definition ************************************************/
const FormField = ({ formState, name, required=true, register, text, type="text", validate=undefined }) => {
  const getEmptyFieldError = (field_text) => {
    return field_text.trim().length > 0 ? null : "This field must be filled with at least one non-blank character!";
  };

  return (
    <>
      <div className="form_field form-control w-full max-w-sm mb-3">
        <label className="input input-bordered flex items-center gap-2" htmlFor={name}>
          {text}:
          <input
            className="grow"
            name={name}
            type={type}
            {...register(name, {
              required: { message: required ? "This field is mandatory! Please fill it." : undefined, value: required },
              validate: validate ? validate : (required ? getEmptyFieldError : undefined)
            })}
          />
          {!required && <span className="badge badge-warning text-xs">Optional</span>}
        </label>
      </div>
      <FormFieldError error={formState.errors[name]} />
    </>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { FormField };
