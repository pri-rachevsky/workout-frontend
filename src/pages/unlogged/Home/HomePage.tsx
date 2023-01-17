import React from "react";
import Header from "../../../components/Header/Header";
import { useI18n } from "../../../hooks/useI18n";
import { UnloggedUrlPath } from "../../../models/systemMode";
import { Button } from "@mui/material";
import "./HomePage.scss";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FC = () => {
  const { translate } = useI18n(resources);
  const navigate = useNavigate();
  return (
    <>
      <Header tabSelected={UnloggedUrlPath.home} />
      <div className="home-background">
        <div className="home-content">
          <div className="home-texts">
            <h1 className="home-title">{translate(ResourcesKey.title)}</h1>
            <h2 className="home-subtitle">{translate(ResourcesKey.subtitle)}</h2>
            <div className="home-buttons">
              <Button variant="outlined" onClick={() => navigate(UnloggedUrlPath.joinUs)}>
                {translate(ResourcesKey.joinUs)}
              </Button>
              <Button variant="outlined" onClick={() => navigate(UnloggedUrlPath.login)}>
                {translate(ResourcesKey.login)}
              </Button>
            </div>
          </div>
          <img className="home-image" src="homePageIllustration.png" alt="person work outing" />
        </div>
      </div>
    </>
  );
};

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
