import React, { useState } from "react";
import styled from "styled-components";
import { Paper, TextField, Button } from "@material-ui/core";

import { MESSAGES, statuses } from "constants";

import AxiosService from "api";

const Auth = ({ auth, setAuth, showSnackbar, handleModal, refresh }) => {
  const axios = new AxiosService();

  const defaultData = {
    login: "",
    password: ""
  };

  const [data, setData] = useState({
    ...defaultData,
    error: null
  });

  const handleChange = type => e => {
    setData({ ...data, [type]: e.target.value });
  };

  const handleLogin = async () => {
    const { status, text } = await axios.auth(data);

    if (status === 401) {
      showSnackbar(text, statuses.error, true, null);
      setData({ ...data, ...defaultData });
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

  return (
    <Wrapper>
      <div>Введите логин и пароль</div>
      <TextField
        label="Логин"
        value={data.login}
        onChange={handleChange("login")}
      />
      <TextField
        label="Пароль"
        type="password"
        value={data.password}
        onChange={handleChange("password")}
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
  padding: 32px 32px;
  width: 300px;
  min-height: 230px;
`;

const LoginButton = styled(Button)`
  width: 100%;
`;
