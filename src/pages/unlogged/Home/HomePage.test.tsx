import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { useI18n } from "../../../hooks/useI18n";
import { useI18nMock } from "../../../infra/test/useI18nMock";
import { act } from "react-dom/test-utils";
import { useNavigate } from "react-router-dom";

jest.mock("../../../components/Header/Header", () => () => <p>Header</p>);
jest.mock("react-router-dom");
jest.mock("../../../hooks/useI18n");

describe("HomePage", () => {
  const navigateMock = jest.fn();
  beforeEach(() => {
    (useI18n as jest.Mock).mockImplementation(useI18nMock);
    (useNavigate as jest.Mock).mockImplementation(() => navigateMock);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render header, title, subtitle, image and buttons", () => {
    render(<HomePage />);

    expect(screen.getByText(/header/i)).toBeInTheDocument();
    expect(screen.getAllByText(/title/i).length).toBe(2);
    expect(screen.getByText(/subtitle/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /person work outing/i })).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/joinUs/i)).toBeInTheDocument();
  });
  test("should navigate correctly when click on login button", async () => {
    render(<HomePage />);

    const loginButton = screen.getByText(/login/i);

    await act(() => loginButton.click());

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
  test("should navigate correctly when click on joinUs button", async () => {
    render(<HomePage />);

    const joinUsButton = screen.getByText(/joinUs/i);

    await act(() => joinUsButton.click());

    expect(navigateMock).toHaveBeenCalledWith("/join-us");
  });
});
