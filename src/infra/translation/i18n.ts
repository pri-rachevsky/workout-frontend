import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { initialLanguage, SupportedLanguages } from "../../models/language";
import PortugueseTranslation from "./portuguese.json";
import EnglishTranslation from "./english.json";

export const initI18n = () => {
  i18n.use(initReactI18next).init({
    resources: {
      [SupportedLanguages.EN]: {
        translation: transformInOneLevelObject(EnglishTranslation)
      },
      [SupportedLanguages.PT]: {
        translation: transformInOneLevelObject(PortugueseTranslation)
      }
    },
    lng: initialLanguage
  });

  return i18n;
};

export const transformInOneLevelObject = (obj: unknown) => {
  return transformInOneLevelObjectRecursive("", obj);
};

const transformInOneLevelObjectRecursive = (currentKey: string, deepObj: unknown) => {
  let oneLevelObj = {};
  Object.entries(deepObj).forEach(([key, value]) => {
    const finalKey = currentKey ? `${currentKey}.${key}` : key;
    if (typeof value === "string") {
      oneLevelObj[finalKey] = value;
    } else {
      const otherOneLevelObj = transformInOneLevelObjectRecursive(finalKey, value);
      oneLevelObj = { ...oneLevelObj, ...otherOneLevelObj };
    }
  });
  return oneLevelObj;
};
