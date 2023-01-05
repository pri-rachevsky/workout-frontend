import { useI18n } from "./useI18n";
import { renderHook } from "@testing-library/react";
import { useTranslation } from "react-i18next";

jest.mock("react-i18next");

describe("useI18n", () => {
  it("should return translate function which translates", () => {
    (useTranslation as jest.Mock).mockImplementation(() => ({
      t: (keyToTranslate: string) =>
        keyToTranslate === "some.path.dinosaur" ? "some.path.dinosaur" : `${keyToTranslate.slice(10)}-translated`
    }));

    const { result } = renderHook(() =>
      useI18n({ dog: "some.path.dog", cat: "some.path.cat", bird: "some.path.bird", dinosaur: "some.path.dinosaur" })
    );

    expect(result.current.translate("dog")).toEqual("dog-translated");
    expect(result.current.translate("cat")).toEqual("cat-translated");
    expect(result.current.translate("bird")).toEqual("bird-translated");
    expect(result.current.translate("dinosaur")).toEqual(
      "__some.path.dinosaur PATH IS NOT TRANSLATED ON THIS LANGUAGE__"
    );
    expect(result.current.translate("wolf")).toEqual("__wolf KEY WAS NOT PROVIDED TO BE TRANSLATED__");
  });
});
