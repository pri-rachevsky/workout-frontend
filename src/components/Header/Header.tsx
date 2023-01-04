import React from "react";
import { AppBar, Tab, Tabs, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../hooks/useI18n";
import { LoginState, NoUserLoggedPage } from "../../models/systemMode";
import "./Header.css";
import LanguageToggle from "../LanguageToggle/LanguageToggle";

type HeaderProps = {
  mode: LoginState;
  tabSelected: NoUserLoggedPage;
};

export default function Header({ mode, ...props }: HeaderProps) {
  return <>{mode === LoginState.noUserLogged && <NoUserLoggedHeader {...props} />}</>;
}

function NoUserLoggedHeader({ tabSelected }: Omit<HeaderProps, "mode">) {
  const navigate = useNavigate();
  const resources = useI18n([
    "homePage.tab.home",
    "homePage.tab.aboutUs",
    "homePage.tab.joinUs",
    "homePage.tab.workoutMethod"
  ]);

  const onTabSelected = (_, tab: NoUserLoggedPage | "") => {
    navigate(`/${tab}`);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <div className="toolbarWrapper">
          <div className="logoAndTabsWrapper">
            <img
              className="logoImage"
              height={100}
              src="logo.png"
              alt="Workout logo"
              onClick={() => onTabSelected(undefined, "")}
            />
            <div className="tabs">
              <Tabs value={tabSelected} onChange={onTabSelected}>
                <Tab label={resources["homePage.tab.home"]} value={NoUserLoggedPage.home} />
                <Tab label={resources["homePage.tab.aboutUs"]} value={NoUserLoggedPage.aboutUs} />
                <Tab label={resources["homePage.tab.workoutMethod"]} value={NoUserLoggedPage.workoutMethod} />
                <Tab label={resources["homePage.tab.joinUs"]} value={NoUserLoggedPage.joinUs} />
              </Tabs>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </Toolbar>
    </AppBar>
  );
}
