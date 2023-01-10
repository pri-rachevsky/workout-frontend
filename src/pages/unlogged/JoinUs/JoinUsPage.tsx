import React from "react";
import Header from "../../../components/Header/Header";
import { useI18n } from "../../../hooks/useI18n";
import { NoUserLoggedPage } from "../../../models/systemMode";
import "./JoinUs.css";

export const JoinUs: React.FC = () => {
  const { translate } = useI18n(resources);
  return (
    <>
      <Header tabSelected={NoUserLoggedPage.joinUs} />
      <h1>{translate(ResourcesKey.title)}</h1>
    </>
  );
};

enum ResourcesKey {
  title = "title"
}

const resources = {
  [ResourcesKey.title]: "unlogged.joinUsPage.title"
};
