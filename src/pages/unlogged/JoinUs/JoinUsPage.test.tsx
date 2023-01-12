import React from "react";
import { act, render, screen } from "@testing-library/react";
import { useI18n } from "../../../hooks/useI18n";
import { useI18nMock } from "../../../infra/test/useI18nMock";
import { JoinUsPage } from "./JoinUsPage";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../../service/user.service";
import { LoggedContext } from "../../../contexts/logged.context";
import { LoginState } from "../../../models/systemMode";
import { personalTrainerMock, studentMock } from "../../../infra/test/userMock";
import userEvent from "@testing-library/user-event";

jest.mock("../../../components/Header/Header", () => () => <p>Header</p>);
jest.mock("react-router-dom");
jest.mock("../../../hooks/useI18n");
jest.mock("../../../service/user.service");

const sut = () => {
  const setLoggedMock = jest.fn();
  const JoinUsPageMock = () => (
    <LoggedContext.Provider value={{ logged: { state: LoginState.noUserLogged }, setLogged: setLoggedMock }}>
      <JoinUsPage />
    </LoggedContext.Provider>
  );

  return { JoinUsPageMock, setLoggedMock };
};
describe("JoinUs", () => {
  const navigateMock = jest.fn();
  const createServiceMock = jest.fn();
  beforeEach(() => {
    (useNavigate as jest.Mock).mockImplementation(() => navigateMock);
    (useI18n as jest.Mock).mockImplementation(useI18nMock);
    (UserService.create as jest.Mock).mockImplementation(createServiceMock);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const getElements = () => {
    const createAccountButton = screen.getByText(/createAccount/i);
    const signInButton = screen.getByRole("button", { name: /signIn/i });
    const usernameInput = screen.getByLabelText(/username/i);
    const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/password/i);
    const fullNameInput = screen.getByLabelText(/fullName/i);
    const accountTypeSelect = screen.getByLabelText(/accountType/i);
    // const select = screen.getByTestId("accountTypeSelect");
    // const accountTypeSelect = select.childNodes[0].childNodes[0];

    return {
      createAccountButton,
      signInButton,
      usernameInput,
      passwordInput,
      confirmPasswordInput,
      fullNameInput,
      accountTypeSelect
    };
  };

  test("should render header, title", () => {
    render(<JoinUsPage />);

    expect(screen.getByText(/header/i)).toBeInTheDocument();
    expect(screen.getByText(/title/i)).toBeInTheDocument();
  });
  it("should render header, forms and button", () => {
    const { JoinUsPageMock } = sut();
    render(<JoinUsPageMock />);

    expect(screen.getByText(/header/i)).toBeInTheDocument();
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fullName/i)).toBeInTheDocument();
    expect(screen.getAllByText(/accountType/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/password/i).length).toBe(2);
    expect(screen.getByLabelText(/confirmPassword/i)).toBeInTheDocument();
    expect(screen.getByText(/createAccount/i)).toBeInTheDocument();
    expect(screen.getByText(/alreadyHaveAccount/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /signIn/i })).toBeInTheDocument();
  });

  it("should navigate when click on signIn button", async () => {
    const { JoinUsPageMock } = sut();
    render(<JoinUsPageMock />);

    const { signInButton } = getElements();
    await act(() => signInButton.click());

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  it("should call create service when click on createAccount button with right data when it is student", async () => {
    createServiceMock.mockResolvedValue(studentMock);
    const { JoinUsPageMock, setLoggedMock } = sut();
    render(<JoinUsPageMock />);

    const formData = { ...studentMock };
    delete formData.id;

    const {
      createAccountButton,
      usernameInput,
      passwordInput,
      confirmPasswordInput,
      fullNameInput,
      accountTypeSelect
    } = getElements();
    expect(createAccountButton).toBeDisabled();

    confirmPasswordInput.blur();

    await act(async () => {
      userEvent.type(fullNameInput, formData.name);
      userEvent.type(usernameInput, formData.username);
      userEvent.type(passwordInput, formData.password);
      userEvent.type(confirmPasswordInput, formData.password);
      await userEvent.click(accountTypeSelect);
    });
    const studentOption = await screen.findByText("student");
    await act(async () => await userEvent.click(studentOption));
    accountTypeSelect.blur();
    expect(createAccountButton).toBeEnabled();

    await act(async () => await createAccountButton.click());

    expect(createServiceMock).toHaveBeenCalledWith(formData);
    expect(setLoggedMock).toHaveBeenCalledWith({ user: studentMock, state: LoginState.studentLogged });
    expect(navigateMock).toHaveBeenCalledWith("/");
    expect(screen.queryByText(/unexpectedErrorMessage/i)).not.toBeInTheDocument();
  });
  it("should call create service when click on createAccount button with right data when it is personal trainer", async () => {
    createServiceMock.mockResolvedValue(personalTrainerMock);
    const { JoinUsPageMock, setLoggedMock } = sut();
    render(<JoinUsPageMock />);

    const formData = { ...personalTrainerMock };
    delete formData.id;

    const {
      createAccountButton,
      usernameInput,
      passwordInput,
      confirmPasswordInput,
      fullNameInput,
      accountTypeSelect
    } = getElements();
    expect(createAccountButton).toBeDisabled();

    confirmPasswordInput.blur();

    await act(async () => {
      userEvent.type(fullNameInput, formData.name);
      userEvent.type(usernameInput, formData.username);
      userEvent.type(passwordInput, formData.password);
      userEvent.type(confirmPasswordInput, formData.password);
      await userEvent.click(accountTypeSelect);
    });
    const personalOption = await screen.findByText("personalTrainer");
    await act(async () => await userEvent.click(personalOption));
    accountTypeSelect.blur();
    expect(createAccountButton).toBeEnabled();

    await act(async () => await createAccountButton.click());

    expect(createServiceMock).toHaveBeenCalledWith(formData);
    expect(setLoggedMock).toHaveBeenCalledWith({ user: personalTrainerMock, state: LoginState.personalTrainerLogged });
    expect(navigateMock).toHaveBeenCalledWith("/");
    expect(screen.queryByText(/unexpectedErrorMessage/i)).not.toBeInTheDocument();
  });
});
