import { initI18n, transformInOneLevelObject } from "./i18n";
import i18n from "i18next";
import { SupportedLanguages } from "../models/language";

jest.mock("i18next");
jest.mock("./english.json", () => ({
  page1: { title: "hello", description: "world!" },
  page2: "something"
}));
jest.mock("./portuguese.json", () => ({
  page1: { title: "oi", description: "mundo!" },
  page2: "alguma coisa"
}));

describe("i18n", () => {
  test("initI18n", () => {
    const initSpy = jest.fn();
    (i18n.use as jest.Mock).mockReturnValue({ init: initSpy });

    initI18n();

    expect(initSpy).toHaveBeenCalledWith({
      resources: {
        [SupportedLanguages.EN]: {
          translation: {
            "page1.title": "hello",
            "page1.description": "world!",
            page2: "something"
          }
        },
        [SupportedLanguages.PT]: {
          translation: {
            "page1.title": "oi",
            "page1.description": "mundo!",
            page2: "alguma coisa"
          }
        }
      },
      lng: SupportedLanguages.EN,
      fallbackLng: SupportedLanguages.EN
    });
  });
  test("transformInOneLevelObject", () => {
    let result = transformInOneLevelObject({ first: { second: "1" } });
    expect(result).toStrictEqual({ "first.second": "1" });

    result = transformInOneLevelObject({
      firstA: {
        secondA: "1",
        secondB: {
          thirdA: { fourthA: "2", fourthB: "3" }
        },
        secondC: "4",
        secondD: { thirdC: "5" }
      },
      firstB: "6"
    });
    expect(result).toStrictEqual({
      "firstA.secondA": "1",
      "firstA.secondB.thirdA.fourthA": "2",
      "firstA.secondB.thirdA.fourthB": "3",
      "firstA.secondC": "4",
      "firstA.secondD.thirdC": "5",
      firstB: "6"
    });
  });
});
