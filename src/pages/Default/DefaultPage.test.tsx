import React from "react";
import { render, screen } from "@testing-library/react";
import DefaultPage from "./DefaultPage";

test("should render", () => {
  render(<DefaultPage />);
});
