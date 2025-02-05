/*********************************************** External Node modules ************************************************/
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { Logger } from "/src/utils/Logger.js";
import { RegisterForm } from "/src/components/organisms";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("ConsumerRegisterForm");

/************************************************ Component Definition ************************************************/
const ConsumerRegisterForm = () => {
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(async (formData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/consumers`, {
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
        method: "POST"
      });
      const json = await response.json();
      if (!response.ok) {
        throw json.error;
      }
      alert("[SUCCESS] Consumer user created successfully!");
      navigate("/login");
    } catch (error) {
      const errorText = "Consumer user could not be created!";
      logger.error(errorText, error);
      alert(`[ERROR] ${errorText}`);
    }
  }, []);

  const formFields = [
    { name: "name", text: "Name" },
    { name: "surname", text: "Surname" }
  ];

  return (
    <RegisterForm formFields={formFields} formTitle="Create Your Consumer Account" handleOnSubmit={handleOnSubmit} />
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ConsumerRegisterForm };
