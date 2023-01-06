import React from "react";
import { render, screen } from "@testing-library/react";
import { PageLoadingWrapper } from "./PageLoadingWrapper";

describe("PageLoadingWrapper", () => {
  test("should render children when isLoading is false", () => {
    render(
      <PageLoadingWrapper isLoading={false}>
        <p>content</p>
      </PageLoadingWrapper>
    );
    expect(screen.getByText("content")).toBeInTheDocument();
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
  });
  test("should render spinner when isLoading is true", () => {
    render(
      <PageLoadingWrapper isLoading>
        <p>content</p>
      </PageLoadingWrapper>
    );
    expect(screen.queryByText("content")).not.toBeInTheDocument();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
