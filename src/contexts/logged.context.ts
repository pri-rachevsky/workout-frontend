import React from "react";
import { LoginState } from "../models/systemMode";
import { User } from "../models/user";

export type LoggedContext = {
  state: LoginState;
  user?: User;
};
export type LoggedContextProps = {
  logged: LoggedContext;
  setLogged?: (logged: LoggedContext) => void;
};

export const initialLoggedContextValue = {
  logged: {
    state: LoginState.noUserLogged,
    user: undefined
  },
  setLogged: () => {
    throw new Error("setLogged not implemented on LoggedContext");
  }
};

export const LoggedContext = React.createContext<LoggedContextProps>(initialLoggedContextValue);
