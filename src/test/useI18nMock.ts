export const useI18nMock = (resourcesKeys: string[]) => {
  const resources = {};
  resourcesKeys.forEach((key) => {
    resources[key] = key;
  });
  return resources;
};
