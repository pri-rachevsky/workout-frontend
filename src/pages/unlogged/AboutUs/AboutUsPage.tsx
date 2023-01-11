import React from "react";
import Header from "../../../components/Header/Header";
import { useI18n } from "../../../hooks/useI18n";
import { NoUserLoggedPage } from "../../../models/systemMode";
import "./AboutUsPage.scss";

export const AboutUsPage: React.FC = () => {
  const { translate } = useI18n(resources);
  return (
    <>
      <Header tabSelected={NoUserLoggedPage.aboutUs} />
      <h1>{translate(ResourcesKey.title)}</h1>
    </>
  );
};

enum ResourcesKey {
  title = "title"
}

const resources = {
  [ResourcesKey.title]: "unlogged.aboutUsPage.title"
};
