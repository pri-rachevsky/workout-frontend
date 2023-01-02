import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import DefaultPage from "./pages/Default/DefaultPage";
import { initI18n } from "./translation/i18n";
import { I18nextProvider } from "react-i18next";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultPage />
  }
]);

export default function App() {
  const i18n = initI18n();
  return (
    <div className="container">
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </div>
  );
}
