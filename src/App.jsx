/****************************************************** Styles ********************************************************/
import "./App.css";

/************************************************ Node modules needed *************************************************/
import { BrowserRouter, Route, Routes } from "react-router-dom";

/************************************************* Internal libraries *************************************************/
import { Header } from "/src/components/organisms";
import { HomePage } from "/src/pages";
import { AuthContextProvider } from "/src/contexts/AuthContext";
import { LoginPage } from "/src/pages";
import { RegisterPage } from "/src/pages";
import { UsersPage } from "./pages/UsersPage";

/************************************************ Component Definition ************************************************/
const App = () => (
  <AuthContextProvider>
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  </AuthContextProvider>
);

/********************************************** Named export (ES module) **********************************************/
export { App };
