import { CircularProgress } from "@mui/material";
import React, { ReactElement } from "react";
import "./PageLoadingWrapper.css";

type PageLoadingWrapperParams = {
  isLoading: boolean;
  children: ReactElement;
};

export const PageLoadingWrapper: React.FC<PageLoadingWrapperParams> = ({ isLoading, children }) => {
  return (
    <>
      {isLoading ? (
        <div className="loading">
          <CircularProgress data-testid="spinner" />
        </div>
      ) : (
        children
      )}
    </>
  );
};
