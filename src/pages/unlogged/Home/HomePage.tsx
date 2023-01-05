import React from "react";
import Header from "../../../components/Header/Header";
import { useI18n } from "../../../hooks/useI18n";
import { LoginState, NoUserLoggedPage } from "../../../models/systemMode";
import { Button } from "@mui/material";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { translate } = useI18n(resources);
  const navigate = useNavigate();
  return (
    <>
      <Header mode={LoginState.noUserLogged} tabSelected={NoUserLoggedPage.home} />
      <div className="container">
        <div className="content">
          <div className="texts">
            <h1 className="title">{translate(ResourcesKey.title)}</h1>
            <h2 className="subtitle">{translate(ResourcesKey.subtitle)}</h2>
            <div className="buttons">
              <Button variant="outlined" onClick={() => navigate(`/${NoUserLoggedPage.joinUs}`)}>
                {translate(ResourcesKey.joinUs)}
              </Button>
              <Button variant="outlined" onClick={() => navigate(`/${NoUserLoggedPage.login}`)}>
                {translate(ResourcesKey.login)}
              </Button>
            </div>
          </div>
          <img className="image" src="homePageIllustration.png" alt="person work outing" />
        </div>
      </div>
    </>
  );
}

enum ResourcesKey {
  title = "title",
  subtitle = "subtitle",
  login = "login",
  joinUs = "joinUs"
}

const resources = {
  [ResourcesKey.title]: "unlogged.homePage.title",
  [ResourcesKey.subtitle]: "unlogged.homePage.subtitle",
  [ResourcesKey.login]: "unlogged.tab.login",
  [ResourcesKey.joinUs]: "unlogged.tab.joinUs"
};
