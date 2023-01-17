import { Alert, Button, Card, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import { PageLoadingWrapper } from "../../../components/PageLoadingWrapper/PageLoadingWrapper";
import { useI18n } from "../../../hooks/useI18n";
import { useLoginUser } from "../../../hooks/useLoginUser";
import { NoUserLoggedPage } from "../../../models/systemMode";
import { Role } from "../../../models/user";
import { UserService } from "../../../service/user.service";
import "./JoinUs.scss";

type RegistrationForm = {
  fullName: string;
  role: Role;
  username: string;
  password: string;
  confirmPassword: string;
};

export const JoinUsPage: React.FC = () => {
  const { translate } = useI18n(resources);
  const navigate = useNavigate();
  const { loginUser } = useLoginUser();
  const { register, getValues, formState } = useForm<RegistrationForm>();
  const [error, setError] = useState<{ hasError: boolean; message?: ResourcesKey }>({
    hasError: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const onJoinUsClick = async () => {
    setError({ hasError: false });
    setIsLoading(true);

    try {
      const { fullName, role, username, password, confirmPassword } = getValues();
      if (password !== confirmPassword) {
        setError({ hasError: true, message: ResourcesKey.passwordErrorMsg });
        return;
      }
      const user = await UserService.create({ username, password, role, name: fullName });
      loginUser(user);
    } catch (error) {
      const message =
        error.message === "username already exists" ? ResourcesKey.usernameErrorMsg : ResourcesKey.unexpectedErrorMsg;
      setError({ hasError: true, message });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignInClick = () => {
    navigate(`/${NoUserLoggedPage.login}`);
  };

  const JoinUsInput: React.FC<{
    name: keyof RegistrationForm;
    resourceKey: ResourcesKey;
    type?: React.InputHTMLAttributes<unknown>["type"];
  }> = ({ name, resourceKey, type }) => (
    <TextField
      type={type}
      label={translate(resourceKey)}
      {...register(name, { required: true })}
      className="joinUs-input"
    />
  );

  return (
    <PageLoadingWrapper isLoading={isLoading}>
      <>
        <Header tabSelected={NoUserLoggedPage.joinUs} />
        <div className="joinUs-background">
          <div className="joinUs-content">
            <Card className="joinUs-forms">
              <h1>{translate(ResourcesKey.title)}</h1>
              {error.hasError && (
                <Alert severity="error" className="joinUs-errorAlert">
                  {translate(error.message)}
                </Alert>
              )}
              <JoinUsInput name="fullName" resourceKey={ResourcesKey.fullName} />
              <FormControl>
                <InputLabel id="accountType-selectId">{translate(ResourcesKey.accountType)}</InputLabel>
                <Select
                  labelId="accountType-selectId"
                  label={translate(ResourcesKey.accountType)}
                  data-testid="accountTypeSelect"
                  inputProps={register("role", {
                    required: true
                  })}
                  className="joinUs-select"
                >
                  <MenuItem value={Role.Student}>{translate(ResourcesKey.student)}</MenuItem>
                  <MenuItem value={Role.PersonalTrainer}>{translate(ResourcesKey.personalTrainer)}</MenuItem>
                </Select>
              </FormControl>
              <JoinUsInput name="username" resourceKey={ResourcesKey.username} />
              <JoinUsInput name="password" type="password" resourceKey={ResourcesKey.password} />
              <JoinUsInput name="confirmPassword" type="password" resourceKey={ResourcesKey.confirmPassword} />
              <Button
                disabled={!formState.isValid}
                variant="contained"
                onClick={onJoinUsClick}
                className="login button"
              >
                {translate(ResourcesKey.createAccount)}
              </Button>
            </Card>
            <Card className="joinUs-alreadyHaveAccountCard">
              <p>
                {translate(ResourcesKey.alreadyHaveAccount) + " "}
                <Button style={{ textTransform: "none" }} onClick={onSignInClick}>
                  {translate(ResourcesKey.signIn)}
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
  fullName = "fullName",
  accountType = "accountType",
  personalTrainer = "personalTrainer",
  student = "student",
  username = "username",
  password = "password",
  confirmPassword = "confirmPassword",
  createAccount = "createAccount",
  alreadyHaveAccount = "alreadyHaveAccount",
  signIn = "signIn",
  signInErrorMessage = "signInErrorMessage",
  unexpectedErrorMsg = "unexpectedErrorMessage",
  passwordErrorMsg = "passwordErrorMsg",
  usernameErrorMsg = "usernameErrorMsg"
}

const resources = {
  [ResourcesKey.title]: "unlogged.joinUsPage.title",
  [ResourcesKey.fullName]: "unlogged.joinUsPage.fullName",
  [ResourcesKey.accountType]: "unlogged.joinUsPage.accountType.label",
  [ResourcesKey.personalTrainer]: "unlogged.joinUsPage.accountType.personalTrainer",
  [ResourcesKey.student]: "unlogged.joinUsPage.accountType.student",
  [ResourcesKey.username]: "unlogged.username",
  [ResourcesKey.password]: "unlogged.password",
  [ResourcesKey.confirmPassword]: "unlogged.joinUsPage.confirmPassword",
  [ResourcesKey.createAccount]: "unlogged.joinUsPage.createAccount",
  [ResourcesKey.alreadyHaveAccount]: "unlogged.joinUsPage.alreadyHaveAccount",
  [ResourcesKey.signIn]: "unlogged.signIn",
  [ResourcesKey.signInErrorMessage]: "unlogged.joinUsPage.signInErrorMessage",
  [ResourcesKey.unexpectedErrorMsg]: "common.unexpectedErrorMessage",
  [ResourcesKey.passwordErrorMsg]: "unlogged.joinUsPage.errorMessage.passwordSameAsConfirmPassword",
  [ResourcesKey.usernameErrorMsg]: "unlogged.joinUsPage.errorMessage.usernameAlreadyExistsErrorMsg"
};
