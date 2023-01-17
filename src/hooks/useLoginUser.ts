import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedContext } from "../contexts/logged.context";
import { DefaultUrlPath, LoginState } from "../models/systemMode";
import { Role, User } from "../models/user";

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { setLogged } = useContext(LoggedContext);

  const loginUser = (user: User) => {
    const roleMap = {
      [Role.PersonalTrainer]: LoginState.personalTrainerLogged,
      [Role.Student]: LoginState.studentLogged
    };
    const state = roleMap[user.role];
    setLogged({ state, user });
    navigate(DefaultUrlPath);
  };

  return { loginUser };
};
