import React from "react";
import { render, screen } from "@testing-library/react";
import { initI18n } from "./infra/translation/i18n";
import App from "./App";

jest.mock("./pages/unlogged", () => ({
  HomePage: () => <>HomePage Content</>,
  AboutUsPage: () => <>AboutUsPage Content</>,
  JoinUs: () => <>JoinUs Content</>,
  LoginPage: () => <>LoginPage Content</>
}));
jest.mock("./infra/translation/i18n");

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should initialize i18n and display Home page", () => {
    (initI18n as jest.Mock).mockImplementation(() => {});

    render(<App />);
    expect(initI18n).toHaveBeenCalled();
    expect(screen.getByText("HomePage Content")).toBeInTheDocument();
  });
});
