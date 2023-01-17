import React from "react";
import { render, screen, act } from "@testing-library/react";
import { LoginPage } from "./LoginPage";
import { useI18n } from "../../../hooks/useI18n";
import { useNavigate } from "react-router-dom";
import { useI18nMock } from "../../../infra/test/useI18nMock";
import userEvent from "@testing-library/user-event";
import { UserService } from "../../../service/user.service";
import { studentMock } from "../../../infra/test/userMock";
import { useLoginUser } from "../../../hooks/useLoginUser";

jest.mock("../../../components/Header/Header", () => () => <p>Header</p>);
jest.mock("react-router-dom");
jest.mock("../../../hooks/useI18n");
jest.mock("../../../service/user.service");
jest.mock("../../../hooks/useLoginUser");

const sut = () => {
  const LoginPageMock = () => <LoginPage />;

  return { LoginPageMock };
};

describe("LoginPage", () => {
  const navigateMock = jest.fn();
  const loginServiceMock = jest.fn();
  const loginUserMock = jest.fn();

  beforeEach(() => {
    (useI18n as jest.Mock).mockImplementation(useI18nMock);
    (useNavigate as jest.Mock).mockImplementation(() => navigateMock);
    (UserService.login as jest.Mock).mockImplementation(loginServiceMock);
    (useLoginUser as jest.Mock).mockImplementation(() => ({ loginUser: loginUserMock }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  const getElements = () => {
    const createAccountButton = screen.getByText(/createAccount/i);
    const signInButton = screen.getByText(/signIn/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    return { createAccountButton, signInButton, usernameInput, passwordInput };
  };
  it("should render header, title, forms and button", () => {
    const { LoginPageMock } = sut();
    render(<LoginPageMock />);

    expect(screen.getByText(/header/i)).toBeInTheDocument();
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/signIn/i)).toBeInTheDocument();
    expect(screen.getByText(/doNotHaveAccount/i)).toBeInTheDocument();
    expect(screen.getByText(/createAccount/i)).toBeInTheDocument();
  });

  it("should navigate when click on createAccount button", async () => {
    const { LoginPageMock } = sut();
    render(<LoginPageMock />);

    const { createAccountButton } = getElements();
    await act(() => createAccountButton.click());

    expect(navigateMock).toHaveBeenCalledWith("/join-us");
  });

  it("should call login service when click on sign in button with right logged data", async () => {
    loginServiceMock.mockResolvedValue(studentMock);
    const { LoginPageMock } = sut();
    render(<LoginPageMock />);

    const { signInButton, usernameInput, passwordInput } = getElements();
    expect(signInButton).toBeDisabled();

    await act(async () => {
      userEvent.type(usernameInput, "pri");
      userEvent.type(passwordInput, "1234");
      passwordInput.blur();
    });
    expect(signInButton).toBeEnabled();

    await act(async () => await signInButton.click());

    expect(loginServiceMock).toHaveBeenCalledWith("pri", "1234");
    expect(loginUserMock).toHaveBeenCalledWith(studentMock);
    expect(screen.queryByText(/signInErrorMessage/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/unexpectedErrorMessage/i)).not.toBeInTheDocument();
  });
  it("should show error alert when sign in does not recognize user", async () => {
    loginServiceMock.mockResolvedValue(null);
    const { LoginPageMock } = sut();
    render(<LoginPageMock />);

    const { signInButton, usernameInput, passwordInput } = getElements();

    await act(async () => {
      userEvent.type(usernameInput, "pri");
      userEvent.type(passwordInput, "1234");
      passwordInput.blur();
    });
    await act(async () => await signInButton.click());

    expect(loginServiceMock).toHaveBeenCalledWith("pri", "1234");
    expect(screen.getByText(/signInErrorMessage/i)).toBeInTheDocument();
    expect(screen.queryByText(/unexpectedErrorMessage/i)).not.toBeInTheDocument();
  });
  it("should show error alert when sign in fails", async () => {
    loginServiceMock.mockRejectedValue("something is really wrong");
    const { LoginPageMock } = sut();
    render(<LoginPageMock />);

    const { signInButton, usernameInput, passwordInput } = getElements();

    await act(async () => {
      userEvent.type(usernameInput, "pri");
      userEvent.type(passwordInput, "1234");
      passwordInput.blur();
    });
    await act(async () => await signInButton.click());

    expect(loginServiceMock).toHaveBeenCalledWith("pri", "1234");
    expect(screen.getByText(/unexpectedErrorMessage/i)).toBeInTheDocument();
    expect(screen.queryByText(/signInErrorMessage/i)).not.toBeInTheDocument();
  });
});
