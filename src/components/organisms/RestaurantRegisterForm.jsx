/*********************************************** External Node modules ************************************************/
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { Logger } from "/src/utils/Logger.js";
import { RegisterForm } from "/src/components/organisms";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("RestaurantRegisterForm");

/************************************************ Component Definition ************************************************/
const RestaurantRegisterForm = () => {
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(async (formData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/restaurants`, {
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
        method: "POST"
      });
      const json = await response.json();
      if (!response.ok) {
        throw json.error;
      }
      alert("[SUCCESS] Restaurant user created successfully!");
      navigate("/login");
    } catch (error) {
      const errorText = "Restaurant user could not be created!";
      logger.error(errorText, error);
      alert(`[ERROR] ${errorText}`);
    }
  });

  const formFields = [
    { name: "name", text: "Name" },
    { name: "description", required: false, text: "Description" },
    { name: "location", text: "Location" },
    { name: "phone", required: false, text: "Phone" },
    { name: "web_page", required: false, text: "Web Page" }
  ];

  return (
    <RegisterForm formFields={formFields} formTitle="Create Your Restaurant Account" handleOnSubmit={handleOnSubmit} />
  );
};

/********************************************** Named export (ES module) **********************************************/
export { RestaurantRegisterForm };
