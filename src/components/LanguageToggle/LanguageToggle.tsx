import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import i18n from "i18next";
import { SupportedLanguages } from "../../models/language";
import "./LanguageToggle.css";

export default function LanguageToggle() {
  const [selectedToggle, setSelectedToggle] = useState(SupportedLanguages.EN);

  const changeLanguage = (_, newSelection: SupportedLanguages) => {
    setSelectedToggle(newSelection);
    i18n.changeLanguage(newSelection);
  };
  return (
    <ToggleButtonGroup value={selectedToggle} exclusive onChange={changeLanguage}>
      <ToggleButton value={SupportedLanguages.EN}>EN</ToggleButton>
      <ToggleButton value={SupportedLanguages.PT}>PT</ToggleButton>
    </ToggleButtonGroup>
  );
}
