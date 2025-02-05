/************************************************ Node modules needed *************************************************/
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

/************************************************* Internal libraries *************************************************/
import { App } from "./App.jsx";

/************************************************ Component Definition ************************************************/
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
