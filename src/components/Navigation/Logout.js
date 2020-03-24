import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const Logout = ({ setAuth }) => {
  const handleClick = () => {
    document.cookie =
      "sessionToken=; expires=Thu,, 01 Jan 1970 00:00:00 UTC; path=/;";
    setAuth({
      status: false,
      refresh: false,
      operatorId: localStorage.getItem("operator"),
      sessionToken: null
    });
  };
  return <LogoutButton onClick={handleClick}>Выйти</LogoutButton>;
};

export default Logout;

const LogoutButton = styled(Button)`
  color: ${p => `${p.theme.palette.primary} !important`};
  background: #fff !important;
  padding: 3px 9px;
`;
