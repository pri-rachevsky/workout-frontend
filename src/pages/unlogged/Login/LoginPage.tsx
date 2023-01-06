import React, { useState } from "react";
import { Alert, Button, Card, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { PageLoadingWrapper } from "../../../components/PageLoadingWrapper/PageLoadingWrapper";
import { UserService } from "../../../service/user.service";
import Header from "../../../components/Header/Header";
import { LoginState, NoUserLoggedPage } from "../../../models/systemMode";
import "./LoginPage.css";
import { useI18n } from "../../../hooks/useI18n";
import { useNavigate } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const { translate } = useI18n(resources);
  const navigate = useNavigate();
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
      }
    } catch (error) {
      setError({ hasError: true, message: ResourcesKey.unexpectedErrorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const onCreateAccountClick = () => {
    navigate(`/${NoUserLoggedPage.joinUs}`);
  };

  return (
    <PageLoadingWrapper isLoading={isLoading}>
      <>
        <Header mode={LoginState.noUserLogged} tabSelected={NoUserLoggedPage.login} />
        <div className="container">
          <div className="pageContent">
            <Card className="forms">
              <h1>{translate(ResourcesKey.title)}</h1>
              {error.hasError && (
                <Alert severity="error" style={{ marginBottom: "10px", width: "300px" }}>
                  {translate(error.message)}
                </Alert>
              )}
              <TextField
                label={translate(ResourcesKey.username)}
                {...register("username", { required: true })}
                className="input"
              />
              <TextField
                type="password"
                label={translate(ResourcesKey.password)}
                {...register("password", { required: true })}
                className="input"
              />
              <Button disabled={!formState.isValid} variant="contained" onClick={onLoginClick} className="button">
                {translate(ResourcesKey.signIn)}
              </Button>
            </Card>
            <Card className="newAccountCard">
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
  [ResourcesKey.username]: "unlogged.loginPage.username",
  [ResourcesKey.password]: "unlogged.loginPage.password",
  [ResourcesKey.signIn]: "unlogged.loginPage.signIn",
  [ResourcesKey.doNotHaveAccount]: "unlogged.loginPage.doNotHaveAccount",
  [ResourcesKey.createAccount]: "unlogged.loginPage.createAccount",
  [ResourcesKey.signInErrorMessage]: "unlogged.loginPage.signInErrorMessage",
  [ResourcesKey.unexpectedErrorMessage]: "common.unexpectedErrorMessage"
};
