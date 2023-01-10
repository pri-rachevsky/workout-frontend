import React from "react";
import Header from "../../../../components/Header/Header";
import { useI18n } from "../../../../hooks/useI18n";
import { PersonalTrainerLoggedPage } from "../../../../models/systemMode";
import "./StudentListPage.css";

export const StudentListPage: React.FC = () => {
  const { translate } = useI18n(resources);
  return (
    <>
      <Header tabSelected={PersonalTrainerLoggedPage.studentList} />
      <h1>{translate(ResourcesKey.title)}</h1>
    </>
  );
};

enum ResourcesKey {
  title = "title"
}

const resources = {
  [ResourcesKey.title]: "personalTrainer.studentListPage.title"
};