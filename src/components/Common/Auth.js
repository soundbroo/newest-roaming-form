import React, { useState } from "react";
import styled from "styled-components";
import { Paper, TextField, Button } from "@material-ui/core";

import AxiosService from "api";

const Auth = () => {
  const axios = new AxiosService();

  const [data, setData] = useState({
    login: "",
    password: ""
  });

  const handleChange = type => e => {
    setData({ ...data, [type]: e.target.value });
  };

  const handleLogin = () => {
    axios.login(data);
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
      <LoginButton variant="outlined" color="primary" onClick={handleLogin}>
        Войти
      </LoginButton>
    </Wrapper>
  );
};

export default Auth;

const Wrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 32px;
  width: 300px;
  height: 300px;
`;

const LoginButton = styled(Button)`
  width: 100%;
`;
