import React, { useState } from "react";
import styled from "styled-components";
import { Paper, TextField, Button } from "@material-ui/core";

import AxiosService from "api";

const Auth = ({ isAuth, setAuth }) => {
  const axios = new AxiosService();

  const [data, setData] = useState({
    login: "",
    password: "",
    error: null
  });

  const handleChange = type => e => {
    setData({ ...data, [type]: e.target.value });
  };

  const handleLogin = async () => {
    const { status, text } = await axios.login(data);

    if (status === 401) return setData({ ...data, error: text });
    if (status === 0) return setAuth(!isAuth);
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
        <Warning>{data.error}</Warning>
      </>
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
  min-height: 320px;
`;

const LoginButton = styled(Button)`
  width: 100%;
`;

const Warning = styled.div`
  color: #fe4733;
`;
