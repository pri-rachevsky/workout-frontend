import React, { ReactNode, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { initI18n } from "./infra/translation/i18n";
import { I18nextProvider } from "react-i18next";
import { createTheme, ThemeProvider } from "@mui/material";
import {
  LoginState,
  NoUserLoggedDefaultPage,
  NoUserLoggedPage,
  Page,
  PersonalTrainerDefaultPage,
  PersonalTrainerLoggedPage,
  StudentDefaultPage
} from "./models/systemMode";
import { Role, User } from "./models/user";
import { AboutUsPage, HomePage, JoinUs, LoginPage } from "./pages/unlogged";
import { LoggedContext, LoggedContextProps } from "./contexts/logged.context";
import { WorkoutMethodPage } from "./pages/unlogged/WorkoutMethod/WorkoutMethodPage";
import { ProfessionalProfilePage, StudentListPage } from "./pages/logged/personalTrainer";
import { ClientProfilePage } from "./pages/logged/student";

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
  const [defaultPage, setDefaultPage] = useState<{ element: ReactNode; path: Page }>({
    element: <HomePage />,
    path: NoUserLoggedDefaultPage
  });
  const [logged, setLogged] = useState<LoggedContextProps>({ state: LoginState.noUserLogged });
  const i18n = initI18n();

  const setLoginState = (user: User) => {
    const roleMap = new Map([
      [
        Role.PersonalTrainer,
        {
          state: LoginState.personalTrainerLogged,
          path: PersonalTrainerDefaultPage,
          element: <StudentListPage />
        }
      ],
      [
        Role.Student,
        {
          state: LoginState.studentLogged,
          path: StudentDefaultPage,
          element: <ClientProfilePage />
        }
      ]
    ]);
    const { state, path, element } = roleMap.get(user.role);
    setDefaultPage({ element, path });
    setLogged({ state, user });
  };

  const renderComponentOrRedirects = (loggedState: LoginState, Component: ReactNode) => {
    const defaultPageMap = {
      [LoginState.noUserLogged]: NoUserLoggedDefaultPage,
      [LoginState.personalTrainerLogged]: PersonalTrainerDefaultPage,
      [LoginState.studentLogged]: StudentDefaultPage
    };
    const defaultPagePath = `/${defaultPageMap[loggedState]}`;
    return logged.state !== loggedState ? <Navigate replace to={defaultPagePath} /> : Component;
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <LoggedContext.Provider value={logged}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={defaultPage.element} />

                {/* ----------------------NoUserLoggedPage---------------------- */}
                <Route
                  path={`/${NoUserLoggedPage.login}`}
                  element={renderComponentOrRedirects(
                    LoginState.noUserLogged,
                    <LoginPage onLogin={(user) => setLoginState(user)} />
                  )}
                />
                <Route
                  path={`/${NoUserLoggedPage.aboutUs}`}
                  element={renderComponentOrRedirects(LoginState.noUserLogged, <AboutUsPage />)}
                />
                <Route
                  path={`/${NoUserLoggedPage.workoutMethod}`}
                  element={renderComponentOrRedirects(LoginState.noUserLogged, <WorkoutMethodPage />)}
                />
                <Route
                  path={`/${NoUserLoggedPage.joinUs}`}
                  element={renderComponentOrRedirects(LoginState.noUserLogged, <JoinUs />)}
                />
                <Route
                  path={`/${NoUserLoggedPage.joinUs}`}
                  element={renderComponentOrRedirects(LoginState.noUserLogged, <JoinUs />)}
                />

                {/* ----------------------PersonalTrainerLoggedPage---------------------- */}
                <Route
                  path={`/${PersonalTrainerLoggedPage.profile}`}
                  element={renderComponentOrRedirects(LoginState.personalTrainerLogged, <ProfessionalProfilePage />)}
                />

                {/* ----------------------PersonalTrainerLoggedPage---------------------- */}
              </Routes>
            </BrowserRouter>
          </LoggedContext.Provider>
        </I18nextProvider>
      </ThemeProvider>
    </div>
  );
}
