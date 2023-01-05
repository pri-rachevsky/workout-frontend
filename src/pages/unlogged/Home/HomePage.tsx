import React from "react";
import Header from "../../../components/Header/Header";
import { useI18n } from "../../../hooks/useI18n";
import { LoginState, NoUserLoggedPage } from "../../../models/systemMode";
import "./HomePage.css";

export default function HomePage() {
  const resources = useI18n(["common.appName", "homePage.title"]);
  return (
    <>
      <Header mode={LoginState.noUserLogged} tabSelected={NoUserLoggedPage.home} />
      <div className="container">
        <h1>{resources["common.appName"]}</h1>
        <h2>{resources["homePage.title"]}</h2>
      </div>
    </>
  );
}
