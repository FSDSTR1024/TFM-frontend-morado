/********************************************** Internal library imports **********************************************/
import { FormField } from "/src/components/atoms";

/************************************************ Component Definition ************************************************/
const AuthCredentials = ({ formState, is_register=false, register, watch=null }) => {
  const getInvalidEmailError = (email) => {
    return true ? null : "A valid email must be entered!";
  };

  const getInvalidPasswordError = (password) => {
    return true ? null : "A valid password must be entered!";
  };

  const getUnmatchingPasswordsError = (confirmationPassword) => {
    return (confirmationPassword === watch("password")) ? null : "The passwords do not match!";
  };

  const authFields = [
    { /* Email */
      name: "email",
      text: "Email",
      type: "email",
      validate: getInvalidEmailError
    },
    { /* Password */
      name: "password",
      text: "Password",
      type: "password",
      validate: getInvalidPasswordError
    }
  ];
  if (is_register) {
    authFields.push({
      name: "password_confirm",
      text: "Confirm Password",
      type: "password",
      validate: getUnmatchingPasswordsError
    });
  }

  return (
    <section>
      {authFields.map((field, index) => (
        <div key={index}>
          <FormField formState={formState} register={register} {...field} />
        </div>
      ))}
    </section>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { AuthCredentials };
