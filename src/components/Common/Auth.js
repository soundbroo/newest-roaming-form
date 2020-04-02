import React, { useState } from "react";
import styled from "styled-components";
import { Paper, TextField, Button } from "@material-ui/core";

import { Title } from "components/Common/styled";

import { MESSAGES, AUTH_STATUSES, statuses } from "constants";

import AxiosService from "api";

const Auth = ({ auth, setAuth, showSnackbar, handleModal, refresh }) => {
  const axios = new AxiosService();

  const defaultData = {
    login: "",
    password: ""
  };

  const defaultErrors = {
    login: "",
    password: ""
  };

  const [data, setData] = useState(defaultData);

  const [errors, setErrors] = useState(defaultErrors);

  const handleChange = type => e => {
    setData({ ...data, [type]: e.target.value });
  };

  const handleLogin = async () => {
    const { status, text } = await axios.auth(data);
    const { wrongLoginOrPassword, emptyLogin, emptyPassword } = AUTH_STATUSES;

    if (status === 401 || status === 400) {
      if (text === wrongLoginOrPassword) {
        setErrors({ ...errors, login: true, password: true });
        showSnackbar(text, statuses.error, true, null);
        setData({ ...data, ...defaultData });
      }
      if (text === emptyLogin) {
        setErrors({ ...errors, login: text });
        setData({ ...data, login: "" });
      }
      if (text === emptyPassword) {
        setErrors({ ...errors, password: text });
        setData({ ...data, password: "" });
      }
    }
    if (status === 0) {
      const [id, ...sessionToken] = text.split(" ");
      localStorage.setItem("operator", id);

      if (!refresh) {
        return setAuth({
          ...auth,
          status: !auth.status,
          operatorId: id,
          sessionToken: sessionToken.join(" ")
        });
      } else {
        setAuth({
          ...auth,
          operatorId: id,
          sessionToken: sessionToken.join(" ")
        });
        handleModal();
        showSnackbar(MESSAGES.retrySubmit, statuses.success, true, null);
      }
    }
  };

  const handleFocus = {
    login: () => setErrors({ ...errors, login: false }),
    password: () => setErrors({ ...errors, password: false })
  };

  return (
    <Wrapper>
      <Title>Введите логин и пароль</Title>
      <Field
        error={Boolean(errors.login)}
        label="Логин"
        value={data.login}
        onChange={handleChange("login")}
        onFocus={handleFocus.login}
        helperText={errors?.login}
        required
      />
      <Field
        error={Boolean(errors.password)}
        label="Пароль"
        type="password"
        value={data.password}
        onChange={handleChange("password")}
        onFocus={handleFocus.password}
        helperText={errors?.password}
        required
      />
      <>
        <LoginButton variant="outlined" color="primary" onClick={handleLogin}>
          Войти
        </LoginButton>
      </>
    </Wrapper>
  );
};

export default Auth;

const Wrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  width: 300px;
  min-height: 230px;
  @media (max-width: 360px) {
    padding: 9px;
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
`;

const Field = styled(TextField)`
  height: 70px;
`;
