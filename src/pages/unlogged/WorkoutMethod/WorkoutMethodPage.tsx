import React from "react";
import Header from "../../../components/Header/Header";
import { useI18n } from "../../../hooks/useI18n";
import { UnloggedUrlPath } from "../../../models/systemMode";
import "./WorkoutMethodPage.scss";

export const WorkoutMethodPage: React.FC = () => {
  const { translate } = useI18n(resources);
  return (
    <>
      <Header tabSelected={UnloggedUrlPath.workoutMethod} />
      <h1>{translate(ResourcesKey.title)}</h1>
    </>
  );
};

enum ResourcesKey {
  title = "title"
}

const resources = {
  [ResourcesKey.title]: "unlogged.workoutMethodPage.title"
};
