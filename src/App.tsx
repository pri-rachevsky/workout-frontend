import React, { ReactNode, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { initI18n } from "./infra/translation/i18n";
import { I18nextProvider } from "react-i18next";
import { createTheme, ThemeProvider } from "@mui/material";
import { LoginState, UnloggedUrlPath, PersonalTrainerUrlPath, DefaultUrlPath } from "./models/systemMode";
import { AboutUsPage, HomePage, JoinUsPage, LoginPage } from "./pages/unlogged";
import { initialLoggedContextValue, LoggedContext } from "./contexts/logged.context";
import { WorkoutMethodPage } from "./pages/unlogged/WorkoutMethod/WorkoutMethodPage";
import { ProfessionalProfilePage, StudentListPage } from "./pages/logged/personalTrainer";
import { ClientProfilePage } from "./pages/logged/student";
import { themeOptions } from "./infra/layout/theme";

const theme = createTheme(themeOptions);

export default function App() {
  const [defaultPage, setDefaultPage] = useState<ReactNode>(<HomePage />);
  const [logged, setLogged] = useState<LoggedContext>(initialLoggedContextValue.logged);
  const i18n = initI18n();

  const loginStateToDefaultPageMap = {
    [LoginState.noUserLogged]: <HomePage />,
    [LoginState.personalTrainerLogged]: <StudentListPage />,
    [LoginState.studentLogged]: <ClientProfilePage />
  };

  useEffect(() => {
    const defaultPage = loginStateToDefaultPageMap[logged.state];
    setDefaultPage(defaultPage);
  }, [logged]);

  const renderComponentOrRedirects = (loggedState: LoginState, Component: ReactNode) => {
    return logged.state !== loggedState ? <Navigate replace to={DefaultUrlPath} /> : Component;
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <LoggedContext.Provider value={{ logged, setLogged }}>
            <BrowserRouter>
              <Routes>
                <Route path={DefaultUrlPath} element={defaultPage} />

                {/* ----------------------NoUserLoggedPage---------------------- */}
                <Route
                  path={UnloggedUrlPath.login}
                  element={renderComponentOrRedirects(LoginState.noUserLogged, <LoginPage />)}
                />
                <Route
                  path={UnloggedUrlPath.aboutUs}
                  element={renderComponentOrRedirects(LoginState.noUserLogged, <AboutUsPage />)}
                />
                <Route
                  path={UnloggedUrlPath.workoutMethod}
                  element={renderComponentOrRedirects(LoginState.noUserLogged, <WorkoutMethodPage />)}
                />
                <Route
                  path={UnloggedUrlPath.joinUs}
                  element={renderComponentOrRedirects(LoginState.noUserLogged, <JoinUsPage />)}
                />

                {/* ----------------------PersonalTrainerLoggedPage---------------------- */}
                <Route
                  path={PersonalTrainerUrlPath.profile}
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
