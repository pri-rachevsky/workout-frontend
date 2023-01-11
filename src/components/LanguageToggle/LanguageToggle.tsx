import { styled, Switch } from "@mui/material";
import React, { useState } from "react";
import i18n from "i18next";
import { SupportedLanguages } from "../../models/language";
import "./LanguageToggle.scss";

export default function LanguageToggle() {
  const [selectedToggle, setSelectedToggle] = useState(false);

  const changeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedToggle(event.target.checked);
    const newSelection = event.target.checked ? SupportedLanguages.PT : SupportedLanguages.EN;
    i18n.changeLanguage(newSelection);
  };
  return <MaterialUISwitch sx={{ m: 1 }} value={selectedToggle} onChange={changeLanguage} />;
}

const MaterialUISwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        margin: 6,
        // eslint-disable-next-line quotes
        content: '"PT"'
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#F69127"
      }
    }
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#D4552C",
    width: 32,
    height: 32,
    "&:before": {
      // eslint-disable-next-line quotes
      content: '"EN"',
      margin: 6,
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
    }
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#F69127",
    borderRadius: 20 / 2
  }
}));
