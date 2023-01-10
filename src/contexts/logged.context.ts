import React from "react";
import { LoginState } from "../models/systemMode";
import { User } from "../models/user";

export type LoggedContextProps = {
  state: LoginState;
  user?: User;
};

export const LoggedContext = React.createContext<LoggedContextProps>({
  state: LoginState.noUserLogged,
  user: undefined
});
