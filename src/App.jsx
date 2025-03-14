/****************************************************** Styles ********************************************************/
import "./App.css";

/************************************************ Node modules needed *************************************************/
import { BrowserRouter, Route, Routes } from "react-router-dom";

/************************************************* Internal libraries *************************************************/
import { AuthContextProvider, NotificationsContextProvider, WebSocketContextProvider } from "/src/contexts";
import { ConsumersPage, DishesPage, HomePage, LoginPage, ProfilePage, RegisterPage, RestaurantsPage, SpecificRestaurantPage, UserActivationPage } from "./pages";
import { Footer, ModalOnLogin, ModalOnLogout, ModalOnRegister, ModalOnUserInvalidActivation, ModalOnUserPreviousActivation, ModalOnUserValidActivation } from "/src/components/atoms";
import { Header } from "/src/components/organisms";
import { Logger } from "/src/utils";

/************************************************** Internal logger ***************************************************/
Logger.setLogLevel(import.meta.env.VITE_LOG_LEVEL);
const logger = new Logger("App");

/************************************************ Component Definition ************************************************/
const App = () => (
  <AuthContextProvider>
    <WebSocketContextProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <NotificationsContextProvider>
            <Header />
            <main className="flex-grow">
              <ModalOnLogin />
              <ModalOnLogout />
              <ModalOnRegister />
              <ModalOnUserInvalidActivation />
              <ModalOnUserPreviousActivation />
              <ModalOnUserValidActivation />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/consumers" element={<ConsumersPage />} />
                <Route path="/dishes" element={<DishesPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/restaurants" element={<RestaurantsPage />} />
                <Route path="/restaurants/:restaurantId" element={<SpecificRestaurantPage />} />
                <Route path="/:userKind/:userId/activate" element={<UserActivationPage />} />
              </Routes>
            </main>
            <Footer />
          </NotificationsContextProvider>
        </div>
      </BrowserRouter>
    </WebSocketContextProvider>
  </AuthContextProvider>
);

/********************************************** Named export (ES module) **********************************************/
export { App };
