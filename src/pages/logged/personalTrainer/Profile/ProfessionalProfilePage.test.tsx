import React from "react";
import { render, screen } from "@testing-library/react";
import { useI18n } from "../../../../hooks/useI18n";
import { useI18nMock } from "../../../../infra/test/useI18nMock";
import { ProfessionalProfilePage } from "./ProfessionalProfilePage";

jest.mock("../../../../components/Header/Header", () => () => <p>Header</p>);
jest.mock("react-router-dom");
jest.mock("../../../../hooks/useI18n");

describe("ProfessionalProfilePage", () => {
  beforeEach(() => {
    (useI18n as jest.Mock).mockImplementation(useI18nMock);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render header, title", () => {
    render(<ProfessionalProfilePage />);

    expect(screen.getByText(/header/i)).toBeInTheDocument();
    expect(screen.getByText(/title/i)).toBeInTheDocument();
  });
});
