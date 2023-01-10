import React from "react";
import { Tab, Tabs } from "@mui/material";
import { useI18n } from "../../hooks/useI18n";
import {
  NoUserLoggedDefaultPage,
  NoUserLoggedPage,
  Page,
  PersonalTrainerLoggedPage,
  StudentLoggedPage
} from "../../models/systemMode";
import "./Header.css";
import { HeaderProps } from "./Header";

type HeaderLogoProps = { onClick: () => void };
const HeaderLogo: React.FC<HeaderLogoProps> = ({ onClick }) => (
  <img height={100} src="logo.png" alt="Workout logo" onClick={onClick} />
);

type HeaderContentProps = HeaderProps & {
  onTabSelected: (tab: Page) => void;
};

export const NoUserLoggedHeaderContent: React.FC<HeaderContentProps> = ({ tabSelected, onTabSelected }) => {
  const { translate } = useI18n(resources);
  return (
    <>
      <HeaderLogo onClick={() => onTabSelected(NoUserLoggedDefaultPage)} />
      <Tabs value={tabSelected} onChange={(_, tab) => onTabSelected(tab)}>
        <Tab label={translate(ResourcesKey.home)} value={NoUserLoggedPage.home} />
        <Tab label={translate(ResourcesKey.aboutUs)} value={NoUserLoggedPage.aboutUs} />
        <Tab label={translate(ResourcesKey.workoutMethod)} value={NoUserLoggedPage.workoutMethod} />
        <Tab label={translate(ResourcesKey.joinUs)} value={NoUserLoggedPage.joinUs} />
        <Tab label={translate(ResourcesKey.login)} value={NoUserLoggedPage.login} />
      </Tabs>
    </>
  );
};

export const PersonalTrainerLoggedHeaderContent: React.FC<HeaderContentProps> = ({ tabSelected, onTabSelected }) => {
  const { translate } = useI18n(resources);
  return (
    <>
      <HeaderLogo onClick={() => onTabSelected(PersonalTrainerLoggedPage.studentList)} />
      <Tabs value={tabSelected} onChange={(_, tab) => onTabSelected(tab)}>
        <Tab label={translate(ResourcesKey.myStudents)} value={PersonalTrainerLoggedPage.studentList} />
        <Tab label={translate(ResourcesKey.professionalProfile)} value={PersonalTrainerLoggedPage.profile} />
      </Tabs>
    </>
  );
};

export const StudentLoggedHeaderContent: React.FC<HeaderContentProps> = ({ tabSelected, onTabSelected }) => {
  const { translate } = useI18n(resources);
  return (
    <>
      <HeaderLogo onClick={() => onTabSelected(StudentLoggedPage.profile)} />
      <Tabs value={tabSelected} onChange={(_, tab) => onTabSelected(tab)}>
        <Tab label={translate(ResourcesKey.clientProfile)} value={StudentLoggedPage.profile} />
      </Tabs>
    </>
  );
};

enum ResourcesKey {
  home = "home",
  workoutMethod = "workoutMethod",
  joinUs = "joinUs",
  aboutUs = "aboutUs",
  login = "login",
  myStudents = "myStudents",
  professionalProfile = "professionalProfile",
  clientProfile = "clientProfile"
}

const resources = {
  [ResourcesKey.home]: "unlogged.tab.home",
  [ResourcesKey.aboutUs]: "unlogged.tab.aboutUs",
  [ResourcesKey.joinUs]: "unlogged.tab.joinUs",
  [ResourcesKey.workoutMethod]: "unlogged.tab.workoutMethod",
  [ResourcesKey.login]: "unlogged.tab.login",
  [ResourcesKey.myStudents]: "personalTrainer.tab.myStudents",
  [ResourcesKey.professionalProfile]: "personalTrainer.tab.profile",
  [ResourcesKey.clientProfile]: "student.tab.profile"
};
