import React from "react";
import { render, screen } from "@testing-library/react";
import { initI18n } from "./translation/i18n";
import App from "./App";

jest.mock("./pages/Default/DefaultPage", () => () => <>Default Page Content</>);
jest.mock("./translation/i18n");

describe("App", () => {
  test("should initialize i18n and display default page", () => {
    (initI18n as jest.Mock).mockImplementation(() => {});

    render(<App />);
    expect(initI18n).toHaveBeenCalled();
    expect(screen.getByText("Default Page Content")).toBeInTheDocument();
  });
});
