import React from "react";
import Header from "../../../../components/Header/Header";
import { useI18n } from "../../../../hooks/useI18n";
import { StudentUrlPath } from "../../../../models/systemMode";
import "./ClientProfilePage.scss";

export const ClientProfilePage: React.FC = () => {
  const { translate } = useI18n(resources);
  return (
    <>
      <Header tabSelected={StudentUrlPath.profile} />
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
