import React, { ReactNode, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { AboutUsPage, HomePage, JoinUs, LoginPage } from "./pages/unlogged";
import { initialLoggedContextValue, LoggedContext } from "./contexts/logged.context";
import { WorkoutMethodPage } from "./pages/unlogged/WorkoutMethod/WorkoutMethodPage";
import { ProfessionalProfilePage, StudentListPage } from "./pages/logged/personalTrainer";
import { ClientProfilePage } from "./pages/logged/student";
import { themeOptions } from "./infra/layout/theme";

const theme = createTheme(themeOptions);

export default function App() {
  const [defaultPage, setDefaultPage] = useState<{ element: ReactNode; path: Page }>({
    element: <HomePage />,
    path: NoUserLoggedDefaultPage
  });
  const [logged, setLogged] = useState<LoggedContext>(initialLoggedContextValue.logged);
  const i18n = initI18n();

  const loginStateToDefaultPageMap = {
    [LoginState.noUserLogged]: { element: <HomePage />, path: NoUserLoggedDefaultPage },
    [LoginState.personalTrainerLogged]: { element: <StudentListPage />, path: PersonalTrainerDefaultPage },
    [LoginState.studentLogged]: { element: <ClientProfilePage />, path: StudentDefaultPage }
  };

  useEffect(() => {
    const defaultPage = loginStateToDefaultPageMap[logged.state];
    setDefaultPage(defaultPage);
  }, [logged]);

  const renderComponentOrRedirects = (loggedState: LoginState, Component: ReactNode) => {
    const { path } = loginStateToDefaultPageMap[loggedState];
    return logged.state !== loggedState ? <Navigate replace to={`/${path}`} /> : Component;
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <LoggedContext.Provider value={{ logged, setLogged }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={defaultPage.element} />

                {/* ----------------------NoUserLoggedPage---------------------- */}
                <Route
                  path={`/${NoUserLoggedPage.login}`}
                  element={renderComponentOrRedirects(LoginState.noUserLogged, <LoginPage />)}
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
