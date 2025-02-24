/****************************************************** Styles ********************************************************/
import "./App.css";

/************************************************ Node modules needed *************************************************/
import { BrowserRouter, Route, Routes } from "react-router-dom";

/************************************************* Internal libraries *************************************************/
import { AuthContextProvider } from "/src/contexts/AuthContext";
import { ConsumersPage } from "./pages";
import { Footer } from "/src/components/atoms";
import { Header } from "/src/components/organisms";
import { HomePage } from "/src/pages";
import { LoginPage } from "/src/pages";
import { RegisterPage } from "/src/pages";
import { RestaurantsPage } from "./pages";

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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/restaurants" element={<RestaurantsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </AuthContextProvider>
);

/********************************************** Named export (ES module) **********************************************/
export { App };
