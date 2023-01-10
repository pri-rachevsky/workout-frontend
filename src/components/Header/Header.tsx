import React, { useContext } from "react";
import { AppBar, Toolbar, Icon, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoginState, NoUserLoggedPage, Page } from "../../models/systemMode";
import "./Header.css";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { LoggedContext } from "../../contexts/logged.context";
import {
  NoUserLoggedHeaderContent,
  PersonalTrainerLoggedHeaderContent,
  StudentLoggedHeaderContent
} from "./HeaderContent";

export type HeaderProps = {
  tabSelected: Page;
};

export default function Header(props: HeaderProps) {
  const navigate = useNavigate();
  const {
    logged: { state },
    setLogged
  } = useContext(LoggedContext);

  const onTabSelected = (tab: NoUserLoggedPage) => {
    navigate(`/${tab}`);
  };

  const headerContentProps = {
    ...props,
    onTabSelected
  };
  const loginStateHeaderContentMap = {
    [LoginState.noUserLogged]: <NoUserLoggedHeaderContent {...headerContentProps} />,
    [LoginState.personalTrainerLogged]: <PersonalTrainerLoggedHeaderContent {...headerContentProps} />,
    [LoginState.studentLogged]: <StudentLoggedHeaderContent {...headerContentProps} />
  };

  const onLogoutClicked = () => {
    setLogged({ state: LoginState.noUserLogged });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <div className="toolbarWrapper">
          <div className="logoAndTabsWrapper">{loginStateHeaderContentMap[state]}</div>
          <div>
            {state !== LoginState.noUserLogged && (
              <IconButton data-testid="logoutButton" onClick={onLogoutClicked}>
                <Icon>logout</Icon>
              </IconButton>
            )}
            <LanguageToggle />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
