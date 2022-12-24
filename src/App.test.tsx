import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("should render", () => {
  render(<App />);
  expect(screen.getByText(/Hello World/i)).toBeInTheDocument();
});
