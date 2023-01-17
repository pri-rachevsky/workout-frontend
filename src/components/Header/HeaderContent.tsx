import React from "react";
import { Tab, Tabs } from "@mui/material";
import { useI18n } from "../../hooks/useI18n";
import {
  DefaultUrlPath,
  UnloggedUrlPath,
  UrlPath,
  PersonalTrainerUrlPath,
  StudentUrlPath
} from "../../models/systemMode";
import "./Header.scss";
import { HeaderProps } from "./Header";

type HeaderLogoProps = { onClick: () => void };
const HeaderLogo: React.FC<HeaderLogoProps> = ({ onClick }) => (
  <img className="header-logo" height={100} src="logo.png" alt="Workout logo" onClick={onClick} />
);

type HeaderContentProps = HeaderProps & {
  onTabSelected: (tab: UrlPath) => void;
};

export const NoUserLoggedHeaderContent: React.FC<HeaderContentProps> = ({ tabSelected, onTabSelected }) => {
  const { translate } = useI18n(resources);
  return (
    <>
      <HeaderLogo onClick={() => onTabSelected(DefaultUrlPath)} />
      <Tabs value={tabSelected} onChange={(_, tab) => onTabSelected(tab)}>
        <Tab label={translate(ResourcesKey.home)} value={UnloggedUrlPath.home} />
        <Tab label={translate(ResourcesKey.aboutUs)} value={UnloggedUrlPath.aboutUs} />
        <Tab label={translate(ResourcesKey.workoutMethod)} value={UnloggedUrlPath.workoutMethod} />
        <Tab label={translate(ResourcesKey.joinUs)} value={UnloggedUrlPath.joinUs} />
        <Tab label={translate(ResourcesKey.login)} value={UnloggedUrlPath.login} />
      </Tabs>
    </>
  );
};

export const PersonalTrainerLoggedHeaderContent: React.FC<HeaderContentProps> = ({ tabSelected, onTabSelected }) => {
  const { translate } = useI18n(resources);
  return (
    <>
      <HeaderLogo onClick={() => onTabSelected(PersonalTrainerUrlPath.studentList)} />
      <Tabs value={tabSelected} onChange={(_, tab) => onTabSelected(tab)}>
        <Tab label={translate(ResourcesKey.myStudents)} value={PersonalTrainerUrlPath.studentList} />
        <Tab label={translate(ResourcesKey.professionalProfile)} value={PersonalTrainerUrlPath.profile} />
      </Tabs>
    </>
  );
};

export const StudentLoggedHeaderContent: React.FC<HeaderContentProps> = ({ tabSelected, onTabSelected }) => {
  const { translate } = useI18n(resources);
  return (
    <>
      <HeaderLogo onClick={() => onTabSelected(StudentUrlPath.profile)} />
      <Tabs value={tabSelected} onChange={(_, tab) => onTabSelected(tab)}>
        <Tab label={translate(ResourcesKey.clientProfile)} value={StudentUrlPath.profile} />
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
