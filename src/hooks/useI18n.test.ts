import { useI18n } from "./useI18n";
import { renderHook } from "@testing-library/react";
import { useTranslation } from "react-i18next";

jest.mock("react-i18next");

describe("useI18n", () => {
  it("should return translate", () => {
    (useTranslation as jest.Mock).mockImplementation(() => ({
      t: (keyToTranslate) => `${keyToTranslate}-translated`
    }));

    const { result } = renderHook(() => useI18n(["dog", "cat", "bird"]));

    expect(result.current).toStrictEqual({ dog: "dog-translated", cat: "cat-translated", bird: "bird-translated" });
  });
});
