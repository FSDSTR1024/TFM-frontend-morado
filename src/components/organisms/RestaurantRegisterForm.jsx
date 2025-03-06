/*********************************************** External Node modules ************************************************/
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { RegisterForm } from "/src/components/organisms";
import { useRegister } from "/src/hooks";

/************************************************ Component Definition ************************************************/
const RestaurantRegisterForm = () => {
  const { error, registerRestaurant } = useRegister();
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(async (formData) => {
    const newRestaurantID = await registerRestaurant(formData);
    if (newRestaurantID) {
      document.getElementById("on_register_modal").showModal();
      navigate("/login");
    }
  }, []);

  const formFields = [
    { name: "name", text: "Name" },
    { name: "description", required: false, text: "Description" },
    { name: "location", text: "Location" },
    { name: "phone", required: false, text: "Phone" },
    { name: "web_page", required: false, text: "Web Page" }
  ];

  return (
    <RegisterForm
      error={error}
      formFields={formFields}
      formTitle="Create Your Restaurant Account"
      handleOnSubmit={handleOnSubmit}
    />
  );
};

/********************************************** Named export (ES module) **********************************************/
export { RestaurantRegisterForm };
