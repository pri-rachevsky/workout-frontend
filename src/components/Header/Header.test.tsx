import React from "react";
import { act, render, screen } from "@testing-library/react";
import Header from "./Header";
import {
  LoginState,
  NoUserLoggedDefaultPage,
  NoUserLoggedPage,
  Page,
  PersonalTrainerLoggedPage,
  StudentLoggedPage
} from "../../models/systemMode";
import { useI18nMock } from "../../infra/test/useI18nMock";
import { useI18n } from "../../hooks/useI18n";
import { useNavigate } from "react-router-dom";
import { LoggedContext } from "../../contexts/logged.context";

jest.mock("react-router-dom");
jest.mock("../../hooks/useI18n");

type SutParams = {
  loginState: LoginState;
  tabSelected: Page;
};

const sut = ({ loginState, tabSelected }: SutParams) => {
  const HeaderMock = () => (
    <LoggedContext.Provider value={{ state: loginState }}>
      <Header tabSelected={tabSelected} />
    </LoggedContext.Provider>
  );

  return { HeaderMock };
};

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
      const { HeaderMock } = sut({ loginState: LoginState.noUserLogged, tabSelected: NoUserLoggedDefaultPage });
      render(<HeaderMock />);

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
        const { HeaderMock } = sut({ loginState: LoginState.noUserLogged, tabSelected: NoUserLoggedPage.home });
        render(<HeaderMock />);

        const button = screen.getByText(tabText);
        await act(() => button.click());
        expect(navigateMock).toHaveBeenCalledWith(`/${urlIndex}`);
      });
      test("when click on home tab", async () => {
        const { HeaderMock } = sut({ loginState: LoginState.noUserLogged, tabSelected: NoUserLoggedPage.login });
        render(<HeaderMock />);

        const button = screen.getByText("home");
        await act(() => button.click());
        expect(navigateMock).toHaveBeenCalledWith("/");
      });
      test("when click on logo image", async () => {
        const { HeaderMock } = sut({ loginState: LoginState.noUserLogged, tabSelected: NoUserLoggedPage.login });
        render(<HeaderMock />);

        const logo = screen.getByRole("img", { name: /workout logo/i });
        await act(() => logo.click());
        expect(navigateMock).toHaveBeenCalledWith("/");
      });
    });
  });
  describe("when it is personalTrainerLogged mode", () => {
    test("should render logo, language toggle and tabs", () => {
      const { HeaderMock } = sut({
        loginState: LoginState.personalTrainerLogged,
        tabSelected: PersonalTrainerLoggedPage.studentList
      });
      render(<HeaderMock />);

      expect(screen.getByRole("img", { name: /workout logo/i })).toBeInTheDocument();
      expect(screen.getByText(/myStudents/i)).toBeInTheDocument();
      expect(screen.getByText(/professionalProfile/i)).toBeInTheDocument();
    });
    describe("should navigate correctly", () => {
      it.each([["professionalProfile", PersonalTrainerLoggedPage.profile]])(
        "when click on %s tab",
        async (tabText, urlIndex) => {
          const { HeaderMock } = sut({
            loginState: LoginState.personalTrainerLogged,
            tabSelected: PersonalTrainerLoggedPage.studentList
          });
          render(<HeaderMock />);

          const button = screen.getByText(tabText);
          await act(() => button.click());
          expect(navigateMock).toHaveBeenCalledWith(`/${urlIndex}`);
        }
      );
      test("when click on myStudents tab", async () => {
        const { HeaderMock } = sut({
          loginState: LoginState.personalTrainerLogged,
          tabSelected: PersonalTrainerLoggedPage.profile
        });
        render(<HeaderMock />);

        const button = screen.getByText("myStudents");
        await act(() => button.click());
        expect(navigateMock).toHaveBeenCalledWith("/");
      });
      test("when click on logo image", async () => {
        const { HeaderMock } = sut({
          loginState: LoginState.personalTrainerLogged,
          tabSelected: PersonalTrainerLoggedPage.profile
        });
        render(<HeaderMock />);

        const logo = screen.getByRole("img", { name: /workout logo/i });
        await act(() => logo.click());
        expect(navigateMock).toHaveBeenCalledWith("/");
      });
    });
  });
  describe("when it is studentLogged mode", () => {
    test("should render logo, language toggle and tabs", () => {
      const { HeaderMock } = sut({
        loginState: LoginState.studentLogged,
        tabSelected: StudentLoggedPage.profile
      });
      render(<HeaderMock />);

      expect(screen.getByRole("img", { name: /workout logo/i })).toBeInTheDocument();
      expect(screen.getByText(/clientProfile/i)).toBeInTheDocument();
    });
    describe("should navigate correctly", () => {
      test.skip("when click on profile tab", async () => {
        const { HeaderMock } = sut({
          loginState: LoginState.studentLogged,
          tabSelected: StudentLoggedPage.profile //TODO
        });
        render(<HeaderMock />);

        const button = screen.getByText("clientProfile");
        await act(() => button.click());
        expect(navigateMock).toHaveBeenCalledWith("/");
      });
      test("when click on logo image", async () => {
        const { HeaderMock } = sut({
          loginState: LoginState.studentLogged,
          tabSelected: StudentLoggedPage.profile
        });
        render(<HeaderMock />);

        const logo = screen.getByRole("img", { name: /workout logo/i });
        await act(() => logo.click());
        expect(navigateMock).toHaveBeenCalledWith("/");
      });
    });
  });
});
