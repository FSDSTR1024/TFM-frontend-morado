/****************************************************** Styles ********************************************************/
import "./App.css";

/************************************************ Node modules needed *************************************************/
import { BrowserRouter, Route, Routes } from "react-router-dom";

/************************************************* Internal libraries *************************************************/
import { AuthContextProvider, NotificationsContextProvider, WebSocketContextProvider } from "/src/contexts";
import { ConsumersPage, DishesPage, HomePage, LoginPage, NotFoundPage, ProfilePage, RegisterPage, RestaurantsPage, SpecificConsumerPage, SpecificDishPage, SpecificRestaurantPage, UserActivationPage } from "./pages";
import { Footer, ModalOnAccountDelete, ModalOnLoading, ModalOnLogin, ModalOnLogout, ModalOnRegister, ModalOnUserInvalidActivation, ModalOnUserPreviousActivation, ModalOnUserValidActivation } from "/src/components/atoms";
import { GoToTopButton } from "./components/protons";
import { Header } from "/src/components/organisms";
import { Logger } from "/src/utils";

/************************************************** Internal logger ***************************************************/
Logger.setLogLevel(import.meta.env.VITE_LOG_LEVEL);
const logger = new Logger("App");

/************************************************ Component Definition ************************************************/
const App = () => (
  <AuthContextProvider>
    <NotificationsContextProvider>
      <WebSocketContextProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <ModalOnAccountDelete />
              <ModalOnLoading />
              <ModalOnLogin />
              <ModalOnLogout />
              <ModalOnRegister />
              <ModalOnUserInvalidActivation />
              <ModalOnUserPreviousActivation />
              <ModalOnUserValidActivation />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/consumers" element={<ConsumersPage />} />
                <Route path="/consumers/:consumerId" element={<SpecificConsumerPage />} />
                <Route path="/dishes" element={<DishesPage />} />
                <Route path="/dishes/:dishId" element={<SpecificDishPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/restaurants" element={<RestaurantsPage />} />
                <Route path="/restaurants/:restaurantId" element={<SpecificRestaurantPage />} />
                <Route path="/:userKind/:userId/activate" element={<UserActivationPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <GoToTopButton />
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </WebSocketContextProvider>
    </NotificationsContextProvider>
  </AuthContextProvider>
);

/********************************************** Named export (ES module) **********************************************/
export { App };
