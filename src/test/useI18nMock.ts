export const useI18nMock = () => {
  const translate = (key: string) => key;
  return { translate };
};
