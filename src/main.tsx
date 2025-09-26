import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./i18n"; // لتفعيل الترجمة في المشروع


import AuthContextProvider from "./Context/Context.tsx";
import { FavoritesProvider } from "./Context/FavoritesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </AuthContextProvider>
  </StrictMode>
);
