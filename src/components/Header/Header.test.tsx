import React from "react";
import { act, render, screen } from "@testing-library/react";
import Header from "./Header";
import { LoginState, NoUserLoggedPage } from "../../models/systemMode";
import { useI18nMock } from "../../infra/test/useI18nMock";
import { useI18n } from "../../hooks/useI18n";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom");
jest.mock("../../hooks/useI18n");

describe("Header", () => {
  const navigateMock = jest.fn();
  beforeEach(() => {
    (useI18n as jest.Mock).mockImplementation(useI18nMock);
    (useNavigate as jest.Mock).mockImplementation(() => navigateMock);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("when it is noUserLogged mode", () => {
    test("should render logo, language toggle and tabs", () => {
      render(<Header mode={LoginState.noUserLogged} tabSelected={NoUserLoggedPage.home} />);

      expect(screen.getByRole("img", { name: /workout logo/i })).toBeInTheDocument();
      expect(screen.getByText(/aboutUs/i)).toBeInTheDocument();
      expect(screen.getByText(/workoutMethod/i)).toBeInTheDocument();
      expect(screen.getByText(/joinUs/i)).toBeInTheDocument();
      expect(screen.getByText(/login/i)).toBeInTheDocument();
    });
    describe("should navigate correctly", () => {
      it.each([
        ["workoutMethod", NoUserLoggedPage.workoutMethod],
        ["joinUs", NoUserLoggedPage.joinUs],
        ["aboutUs", NoUserLoggedPage.aboutUs],
        ["login", NoUserLoggedPage.login]
      ])("when click on %s tab", async (tabText, urlIndex) => {
        render(<Header mode={LoginState.noUserLogged} tabSelected={NoUserLoggedPage.home} />);

        const button = screen.getByText(tabText);
        await act(() => button.click());
        expect(navigateMock).toHaveBeenCalledWith(`/${urlIndex}`);
      });
      test("when click on home tab", async () => {
        render(<Header mode={LoginState.noUserLogged} tabSelected={NoUserLoggedPage.login} />);

        const button = screen.getByText("home");
        await act(() => button.click());
        expect(navigateMock).toHaveBeenCalledWith("/");
      });
      test("when click on logo image", async () => {
        render(<Header mode={LoginState.noUserLogged} tabSelected={NoUserLoggedPage.login} />);

        const logo = screen.getByRole("img", { name: /workout logo/i });
        await act(() => logo.click());
        expect(navigateMock).toHaveBeenCalledWith("/");
      });
    });
  });
});
