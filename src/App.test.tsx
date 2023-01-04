import React from "react";
import { render, screen } from "@testing-library/react";
import { initI18n } from "./translation/i18n";
import App from "./App";

jest.mock("./pages/unlogged/Home/HomePage", () => () => <>Home Page Content</>);
jest.mock("./translation/i18n");

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should initialize i18n and display Home page", () => {
    (initI18n as jest.Mock).mockImplementation(() => {});

    render(<App />);
    expect(initI18n).toHaveBeenCalled();
    expect(screen.getByText("Home Page Content")).toBeInTheDocument();
  });
});
