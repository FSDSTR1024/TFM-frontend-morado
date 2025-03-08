/********************************************** Internal library imports **********************************************/
import { FormFieldError } from "/src/components/protons";

/************************************************ Component Definition ************************************************/
const FormField = ({ formState, name, required=true, register, text, type="text", validate=undefined }) => {
  const getEmptyFieldError = (field_text) => {
    return field_text.trim().length > 0 ? null : "This field must be filled with at least one non-blank character!";
  };

  return (
    <>
      <div className="form-control w-full max-w-sm mb-0">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">{text}</legend>
          {type === "textarea" ? (
            <textarea
              className="textarea h-24"
            ></textarea>
          ) : (
            <input
              autoComplete={name}
              className="input"
              name={name}
              type={type}
              {...register(name, {
                required: { message: required ? "This field is mandatory! Please fill it." : undefined, value: required },
                validate: validate ? validate : (required ? getEmptyFieldError : undefined)
              })}
            />
          )}
          {!required && (
            <div className="flex flex-col items-end">
              <span className="badge badge-warning text-xs fieldset-label">Optional</span>
            </div>
          )}
        </fieldset>
      </div>
      <FormFieldError error={formState.errors[name]} />
    </>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { FormField };
