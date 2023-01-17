import React, { useState } from "react";
import { Alert, Button, Card, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { PageLoadingWrapper } from "../../../components/PageLoadingWrapper/PageLoadingWrapper";
import { UserService } from "../../../service/user.service";
import Header from "../../../components/Header/Header";
import "./LoginPage.scss";
import { useI18n } from "../../../hooks/useI18n";
import { useNavigate } from "react-router-dom";
import { UnloggedUrlPath } from "../../../models/systemMode";
import { useLoginUser } from "../../../hooks/useLoginUser";

export const LoginPage: React.FC = () => {
  const { translate } = useI18n(resources);
  const navigate = useNavigate();
  const { loginUser } = useLoginUser();
  const { register, getValues, formState } = useForm();
  const [error, setError] = useState<{ hasError: boolean; message?: ResourcesKey }>({
    hasError: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const onLoginClick = async () => {
    setError({ hasError: false });
    setIsLoading(true);

    try {
      const { username, password } = getValues();
      const user = await UserService.login(username, password);
      if (!user) {
        setError({ hasError: true, message: ResourcesKey.signInErrorMessage });
      } else {
        loginUser(user);
      }
    } catch (error) {
      setError({ hasError: true, message: ResourcesKey.unexpectedErrorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const onCreateAccountClick = () => {
    navigate(UnloggedUrlPath.joinUs);
  };

  return (
    <PageLoadingWrapper isLoading={isLoading}>
      <>
        <Header tabSelected={UnloggedUrlPath.login} />
        <div className="login-background">
          <div className="login-content">
            <Card className="login-forms">
              <h1>{translate(ResourcesKey.title)}</h1>
              {error.hasError && (
                <Alert severity="error" className="login-errorAlert">
                  {translate(error.message)}
                </Alert>
              )}
              <TextField
                label={translate(ResourcesKey.username)}
                {...register("username", { required: true })}
                className="login-input"
              />
              <TextField
                type="password"
                label={translate(ResourcesKey.password)}
                {...register("password", { required: true })}
                className="login-input"
              />
              <Button disabled={!formState.isValid} variant="contained" onClick={onLoginClick} className="login button">
                {translate(ResourcesKey.signIn)}
              </Button>
            </Card>
            <Card className="login-newAccountCard">
              <p>
                {translate(ResourcesKey.doNotHaveAccount) + " "}
                <Button style={{ textTransform: "none" }} onClick={onCreateAccountClick}>
                  {translate(ResourcesKey.createAccount)}
                </Button>
              </p>
            </Card>
          </div>
        </div>
      </>
    </PageLoadingWrapper>
  );
};

enum ResourcesKey {
  title = "title",
  username = "username",
  password = "password",
  signIn = "signIn",
  doNotHaveAccount = "doNotHaveAccount",
  createAccount = "createAccount",
  signInErrorMessage = "signInErrorMessage",
  unexpectedErrorMessage = "unexpectedErrorMessage"
}

const resources = {
  [ResourcesKey.title]: "unlogged.loginPage.title",
  [ResourcesKey.username]: "unlogged.username",
  [ResourcesKey.password]: "unlogged.password",
  [ResourcesKey.signIn]: "unlogged.signIn",
  [ResourcesKey.doNotHaveAccount]: "unlogged.loginPage.doNotHaveAccount",
  [ResourcesKey.createAccount]: "unlogged.loginPage.createAccount",
  [ResourcesKey.signInErrorMessage]: "unlogged.loginPage.signInErrorMessage",
  [ResourcesKey.unexpectedErrorMessage]: "common.unexpectedErrorMessage"
};
