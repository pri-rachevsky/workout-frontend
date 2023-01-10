import { useTranslation } from "react-i18next";

export const useI18n = (resourcesKeys: { [key: string]: string }): { translate: (resourceKey: string) => string } => {
  const { t } = useTranslation();
  const translatedMap = Object.entries(resourcesKeys).reduce((resources, [translateKey, resourcesKey]) => {
    const i18nextTranslatedValue = t(resourcesKey);
    const translated =
      i18nextTranslatedValue === resourcesKey
        ? `__${resourcesKey} PATH IS NOT TRANSLATED ON THIS LANGUAGE__` // big string to be easy to identify missing translations
        : i18nextTranslatedValue;
    resources[translateKey] = translated;
    return resources;
  }, {});

  const translate = (key: string) => {
    return translatedMap[key] || `__${key} KEY WAS NOT PROVIDED TO BE TRANSLATED__`;
  };

  return { translate };
};
