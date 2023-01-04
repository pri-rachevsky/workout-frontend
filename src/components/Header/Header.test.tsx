import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { LoginState, NoUserLoggedPage } from "../../models/systemMode";
import { useI18nMock } from "../../test/useI18nMock";
import { useI18n } from "../../hooks/useI18n";

jest.mock("react-router-dom", () => ({
  useNavigate: () => {}
}));
jest.mock("../../hooks/useI18n");

describe("Header", () => {
  beforeEach(() => {
    (useI18n as jest.Mock).mockImplementation(useI18nMock);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("when it is noUserLogged mode", () => {
    test("should render logo, language toggle and tabs", () => {
      render(<Header mode={LoginState.noUserLogged} tabSelected={NoUserLoggedPage.home} />);

      expect(screen.getByRole("img", { name: /workout logo/i })).toBeInTheDocument();
      expect(screen.getByText(/homePage.tab.aboutUs/i)).toBeInTheDocument();
      expect(screen.getByText(/homePage.tab.workoutMethod/i)).toBeInTheDocument();
      expect(screen.getByText(/homePage.tab.joinUs/i)).toBeInTheDocument();
    });
  });
});
