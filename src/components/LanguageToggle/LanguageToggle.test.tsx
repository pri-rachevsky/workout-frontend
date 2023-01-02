import React from "react";
import { act, render, screen } from "@testing-library/react";
import LanguageToggle from "./LanguageToggle";
import i18n from "i18next";
import { SupportedLanguages } from "../../models/language";

jest.mock("i18next");

describe("LanguageToggle", () => {
  test("should render PT and EN options, EN should be selected", () => {
    render(<LanguageToggle />);
    expect(screen.getByRole("button", { name: /en/i, pressed: true })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pt/i, pressed: false })).toBeInTheDocument();
  });
  test("should PT should be selected when click on it and call changeLanguage. Same behavior for EN", async () => {
    i18n.changeLanguage = jest.fn();
    render(<LanguageToggle />);

    await act(() => screen.getByText("PT").click());

    expect(screen.getByRole("button", { name: /pt/i, pressed: true })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /en/i, pressed: false })).toBeInTheDocument();
    expect(i18n.changeLanguage).toHaveBeenCalledWith(SupportedLanguages.PT);

    await act(() => screen.getByText("EN").click());

    expect(screen.getByRole("button", { name: /en/i, pressed: true })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pt/i, pressed: false })).toBeInTheDocument();
    expect(i18n.changeLanguage).toHaveBeenCalledWith(SupportedLanguages.EN);
  });
});
