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
  const { translate } = useI18n(resources);

  const onTabSelected = (_, tab: NoUserLoggedPage | "") => {
    navigate(`/${tab}`);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <div className="toolbarWrapper">
          <div className="logoAndTabsWrapper">
            <img height={100} src="logo.png" alt="Workout logo" onClick={() => onTabSelected(undefined, "")} />
            <Tabs value={tabSelected} onChange={onTabSelected}>
              <Tab label={translate(ResourcesKey.home)} value={""} />
              <Tab label={translate(ResourcesKey.aboutUs)} value={NoUserLoggedPage.aboutUs} />
              <Tab label={translate(ResourcesKey.workoutMethod)} value={NoUserLoggedPage.workoutMethod} />
              <Tab label={translate(ResourcesKey.joinUs)} value={NoUserLoggedPage.joinUs} />
              <Tab label={translate(ResourcesKey.login)} value={NoUserLoggedPage.login} />
            </Tabs>
          </div>
          <LanguageToggle />
        </div>
      </Toolbar>
    </AppBar>
  );
}

enum ResourcesKey {
  home = "home",
  workoutMethod = "workoutMethod",
  joinUs = "joinUs",
  aboutUs = "aboutUs",
  login = "login"
}

const resources = {
  [ResourcesKey.home]: "unlogged.tab.home",
  [ResourcesKey.aboutUs]: "unlogged.tab.aboutUs",
  [ResourcesKey.joinUs]: "unlogged.tab.joinUs",
  [ResourcesKey.workoutMethod]: "unlogged.tab.workoutMethod",
  [ResourcesKey.login]: "unlogged.tab.login"
};
