/*********************************************** External Node modules ************************************************/
import { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { AuthContext } from "/src/contexts";
import { AuthCredentials } from "/src/components/molecules";
import { FormFieldError } from "/src/components/protons";
import { useLogin } from "/src/hooks";

/**************************************************** Page Content ****************************************************/
const LoginPage = () => {
  const { error, login } = useLogin();
  const { formState, handleSubmit, register } = useForm();
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(async (formData) => {
    const token = await login(formData);
    if (token) {
      navigate("/");
      document.getElementById("on_login_modal").showModal();
    }
  }, []);

  useEffect(() => {
    if (loggedUser) {
      navigate("/");
    }
  }, [loggedUser]);

  return loggedUser ? null : (
    <section className="p-6 bg-base-200 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome Back to Nyam!</h1>
        <p className="text-lg text-gray-600">Log in to continue your culinary journey</p>
      </div>
      <div className="w-full max-w-sm bg-base-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-info underline">Log In to Your Account</h2>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-8">
          <AuthCredentials formState={formState} register={register} />
          <div className="flex flex-col items-center">
            <button type="submit" className="btn btn-primary btn-wide text-base">Log In</button>
            {error && <FormFieldError error={{message: error}} />}
          </div>
        </form>
      </div>
    </section>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { LoginPage };
