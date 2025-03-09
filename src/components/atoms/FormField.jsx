/********************************************** Internal library imports **********************************************/
import { FormFieldError } from "/src/components/protons";

/************************************************ Component Definition ************************************************/
const FormField = ({ formState, list = undefined, name, required=true, register, step = undefined, text, type="text", validate=undefined }) => {
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
              name={name}
              {...register(name, {
                required: { message: required ? "This field is mandatory! Please fill it." : undefined, value: required },
                validate: validate ? validate : (required ? getEmptyFieldError : undefined)
              })}
            ></textarea>
          ) : (type === "checkbox" ? (
            <div className="flex flex-col flex-wrap w-full gap-2 max-h-56 overflow-y-auto">
              {list.map((item) => (
                <label className="fieldset-label" key={item}>
                  <input
                    className="checkbox"
                    type="checkbox"
                    value={item}
                    {...register(`${name}`, {
                      required: { message: required ? "It must be selected at least one item from the list!" : undefined, value: required },
                    })}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          ) : (
            <input
              autoComplete={name}
              className="input"
              name={name}
              step={step}
              type={type}
              {...register(name, {
                required: { message: required ? "This field is mandatory! Please fill it." : undefined, value: required },
                validate: validate ? validate : (required ? getEmptyFieldError : undefined)
              })}
            />
          ))}
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
