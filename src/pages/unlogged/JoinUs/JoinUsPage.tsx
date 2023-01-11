import React from "react";
import Header from "../../../components/Header/Header";
import { useI18n } from "../../../hooks/useI18n";
import { NoUserLoggedPage } from "../../../models/systemMode";
import "./JoinUs.scss";

export const JoinUs: React.FC = () => {
  const { translate } = useI18n(resources);
  return (
    <>
      <Header tabSelected={NoUserLoggedPage.joinUs} />
      <div className="joinUs-background">
        <h1>{translate(ResourcesKey.title)}</h1>
      </div>
    </>
  );
};

enum ResourcesKey {
  title = "title"
}

const resources = {
  [ResourcesKey.title]: "unlogged.joinUsPage.title"
};
