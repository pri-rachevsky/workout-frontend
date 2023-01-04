import React from "react";
import { act, render, screen } from "@testing-library/react";
import LanguageToggle from "./LanguageToggle";
import i18n from "i18next";
import { SupportedLanguages } from "../../models/language";

jest.mock("i18next");

describe("LanguageToggle", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should PT should be selected when click on it and call changeLanguage. Same behavior for EN", async () => {
    i18n.changeLanguage = jest.fn();
    render(<LanguageToggle />);

    const toggle = screen.getByRole("checkbox");
    await act(() => toggle.click());
    expect(i18n.changeLanguage).toHaveBeenCalledWith(SupportedLanguages.PT);

    await act(() => toggle.click());
    expect(i18n.changeLanguage).toHaveBeenCalledWith(SupportedLanguages.EN);
  });
});
