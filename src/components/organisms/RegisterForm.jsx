/*********************************************** External Node modules ************************************************/
import { useForm } from "react-hook-form";

/********************************************** Internal library imports **********************************************/
import { AuthCredentials } from "/src/components/molecules";
import { FormField } from "/src/components/atoms";

/************************************************ Component Definition ************************************************/
const RegisterForm = ({ formFields, formTitle, handleOnSubmit }) => {
  const { formState, handleSubmit, register, watch } = useForm({
    defaultValues: formFields.reduce((accumulator, field) => {
      accumulator[field.name] = field.default ? field.default : "";
      return accumulator;
    }, {})
  });

  return (
    <section className="p-6 bg-base-100 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h4 className="text-2xl font-semibold mb-4 text-center text-info underline">{formTitle}</h4>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-8 flex flex-col items-center">
        <div>
          <h5 className="text-xl font-medium mb-4 text-success">Account Information</h5>
          <div className="space-y-4">
            {formFields.map((field, index) => (
              <div key={index}>
                <FormField formState={formState} register={register} {...field} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h5 className="text-lg font-medium mb-4 text-error">Authentication</h5>
          <AuthCredentials formState={formState} is_register register={register} watch={watch} />
        </div>
        <button type="submit" className="btn btn-primary w-full text-base">Sign up</button>
      </form>
    </section>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { RegisterForm };
