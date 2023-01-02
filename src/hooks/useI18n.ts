import { useTranslation } from "react-i18next";

export const useI18n = (keys: string[]): { [key: string]: string } => {
  const { t: translate } = useTranslation();
  const finalResources = keys.reduce((resources, key) => {
    resources[key] = translate(key);
    return resources;
  }, {});
  return finalResources;
};
