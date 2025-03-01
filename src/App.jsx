/****************************************************** Styles ********************************************************/
import "./App.css";

/************************************************ Node modules needed *************************************************/
import { BrowserRouter, Route, Routes } from "react-router-dom";

/************************************************* Internal libraries *************************************************/
import { AuthContextProvider } from "/src/contexts/AuthContext";
import { ConsumersPage, DishesPage, HomePage, LoginPage, RegisterPage, RestaurantsPage, SpecificRestaurantPage } from "./pages";
import { Footer } from "/src/components/atoms";
import { Header } from "/src/components/organisms";
import { Logger } from "/src/utils";

/************************************************** Internal logger ***************************************************/
Logger.setLogLevel(import.meta.env.VITE_LOG_LEVEL);
const logger = new Logger("App");

/************************************************ Component Definition ************************************************/
const App = () => (
  <AuthContextProvider>
    <BrowserRouter>
      <div id="actual_content" className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/consumers" element={<ConsumersPage />} />
            <Route path="/dishes" element={<DishesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/restaurants" element={<RestaurantsPage />} />
            <Route path="/restaurants/:restaurantId" element={<SpecificRestaurantPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </AuthContextProvider>
);

/********************************************** Named export (ES module) **********************************************/
export { App };
