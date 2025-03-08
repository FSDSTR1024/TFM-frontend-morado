/*********************************************** External Node modules ************************************************/
import { useForm } from "react-hook-form";

/********************************************** Internal library imports **********************************************/
import { AuthCredentials } from "/src/components/molecules";
import { FormField } from "/src/components/atoms";
import { FormFieldError } from "/src/components/protons";

/************************************************ Component Definition ************************************************/
const RegisterForm = ({ error, formFields, formTitle, handleOnSubmit }) => {
  const { formState, handleSubmit, register, watch } = useForm({
    defaultValues: formFields.reduce((accumulator, field) => {
      accumulator[field.name] = field.default ? field.default : "";
      return accumulator;
    }, {})
  });

  return (
    <section className="p-6 bg-base-100 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h4 className="text-2xl font-semibold mb-4 text-center text-info underline">{formTitle}</h4>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-8 flex flex-col items-center">
        <div className="flex justify-between w-full gap-10">
          <div className="w-80">
            <h5 className="text-xl font-medium mb-2 text-success">Account Information</h5>
            <div>
              {formFields.map((field, index) => (
                <div key={index}>
                  <FormField formState={formState} register={register} {...field} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-80">
            <h5 className="text-xl font-medium mb-4 text-error">Authentication</h5>
            <AuthCredentials formState={formState} is_register register={register} watch={watch} />
          </div>
        </div>
        <div className="flex flex-col items-center w-full">
          <button type="submit" className="btn btn-primary btn-wide text-base">Sign up</button>
          {error && <FormFieldError error={{message: error}} />}
        </div>
      </form>
    </section>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { RegisterForm };
