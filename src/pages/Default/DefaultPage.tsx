import React from "react";
import LanguageToggle from "../../components/LanguageToggle/LanguageToggle";
import { useI18n } from "../../hooks/useI18n";
import "./DefaultPage.css";

export default function DefaultPage() {
  const resources = useI18n(["common.appName", "defaultPage.title"]);
  return (
    <div className="container">
      <h1>{resources["common.appName"]}</h1>
      <h2>{resources["defaultPage.title"]}</h2>
      <LanguageToggle />
    </div>
  );
}
