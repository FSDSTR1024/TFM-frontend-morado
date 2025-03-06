/*********************************************** External Node modules ************************************************/
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { RegisterForm } from "/src/components/organisms";
import { useRegister } from "/src/hooks";

/************************************************ Component Definition ************************************************/
const ConsumerRegisterForm = () => {
  const { error, registerConsumer } = useRegister();
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(async (formData) => {
    const newConsumerID = await registerConsumer(formData);
    if (newConsumerID) {
      document.getElementById("on_register_modal").showModal();
      navigate("/login");
    }
  }, []);

  const formFields = [
    { name: "name", text: "Name" },
    { name: "surname", text: "Surname" }
  ];

  return (
    <RegisterForm
      error={error}
      formFields={formFields}
      formTitle="Create Your Consumer Account"
      handleOnSubmit={handleOnSubmit}
    />
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ConsumerRegisterForm };
