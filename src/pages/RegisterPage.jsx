/*********************************************** External Node modules ************************************************/
import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { AuthContext } from "/src/contexts";
import { ConsumerRegisterForm } from "/src/components/organisms";
import { RestaurantRegisterForm } from "/src/components/organisms";

/**************************************************** Page Content ****************************************************/
const RegisterPage = () => {
  /* State variables */
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [viewConsumerForm, setViewConsumerForm] = useState(false);
  const [viewRestaurantForm, setViewRestaurantForm] = useState(false);

  /* Event handlers */
  const handleConsumerButtonClick = useCallback(() => {
    setViewConsumerForm(true);
    setViewRestaurantForm(false);
  }, []);
  const handleRestaurantButtonClick = useCallback(() => {
    setViewConsumerForm(false);
    setViewRestaurantForm(true);
  }, []);

  if (loggedUser) {
    navigate("/profile");
    return null;
  }

  return (
    <section className="p-6 bg-base-200 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Join Nyam!</h1>
        <p className="text-lg text-gray-600">Create an account to start your culinary journey</p>
      </div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Select your user type:</h2>
        <ul className="flex justify-center gap-4">
          <li>
            <button className="btn btn-outline btn-info text-base" onClick={handleConsumerButtonClick}>
              Consumer
            </button>
          </li>
          <li>
            <button className="btn btn-outline btn-info text-base" onClick={handleRestaurantButtonClick}>
              Restaurant
            </button>
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        {viewConsumerForm && <ConsumerRegisterForm />}
        {viewRestaurantForm && <RestaurantRegisterForm />}
      </div>
    </section>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { RegisterPage };
