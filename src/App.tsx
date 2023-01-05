import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/unlogged/Home/HomePage";
import { initI18n } from "./translation/i18n";
import { I18nextProvider } from "react-i18next";
import { createTheme, ThemeProvider } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  }
]);

const theme = createTheme({
  typography: {
    fontFamily: "Alegreya Sans",
    fontWeightLight: 500,
    fontWeightRegular: 600,
    fontWeightMedium: 700
  },
  palette: {
    mode: "light",
    primary: {
      main: "#FFBD58"
    }
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#ffc873",
            color: "black",
            borderRadius: "25px"
          }
        }
      }
    }
  }
});

export default function App() {
  const i18n = initI18n();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <RouterProvider router={router} />
        </I18nextProvider>
      </ThemeProvider>
    </div>
  );
}
