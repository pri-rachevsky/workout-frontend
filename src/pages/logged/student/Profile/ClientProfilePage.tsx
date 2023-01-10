import React from "react";
import Header from "../../../../components/Header/Header";
import { useI18n } from "../../../../hooks/useI18n";
import { StudentLoggedPage } from "../../../../models/systemMode";
import "./ClientProfilePage.css";

export const ClientProfilePage: React.FC = () => {
  const { translate } = useI18n(resources);
  return (
    <>
      <Header tabSelected={StudentLoggedPage.profile} />
      <h1>{translate(ResourcesKey.title)}</h1>
    </>
  );
};

enum ResourcesKey {
  title = "title"
}

const resources = {
  [ResourcesKey.title]: "student.clientProfilePage.title"
};
