import React from "react";
import { useI18n } from "./useI18n";
import { renderHook } from "@testing-library/react";
import { personalTrainerMock, studentMock } from "../infra/test/userMock";
import { LoginState } from "../models/systemMode";
import { useNavigate } from "react-router-dom";
import { LoggedContext } from "../contexts/logged.context";
import { useLoginUser } from "./useLoginUser";

jest.mock("react-router-dom");

const makeWrapper = () => {
  const setLoggedMock = jest.fn();
  const wrapper = ({ children }) => (
    <LoggedContext.Provider value={{ logged: { state: LoginState.noUserLogged }, setLogged: setLoggedMock }}>
      {children}
    </LoggedContext.Provider>
  );

  return { wrapper, setLoggedMock };
};
describe("useLoginWithUser", () => {
  const navigateMock = jest.fn();
  beforeEach(() => {
    (useNavigate as jest.Mock).mockImplementation(() => navigateMock);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should set studentLogged state when the user is student", () => {
    const { wrapper, setLoggedMock } = makeWrapper();
    const { result } = renderHook(() => useLoginUser(), { wrapper });
    result.current.loginUser(studentMock);
    expect(setLoggedMock).toHaveBeenCalledWith({ user: studentMock, state: LoginState.studentLogged });
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
  it("should set personalTrainerLogged state when the user is personal trainer", () => {
    const { wrapper, setLoggedMock } = makeWrapper();
    const { result } = renderHook(() => useLoginUser(), { wrapper });
    result.current.loginUser(personalTrainerMock);
    expect(setLoggedMock).toHaveBeenCalledWith({ user: personalTrainerMock, state: LoginState.personalTrainerLogged });
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
