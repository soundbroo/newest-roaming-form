import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import { MESSAGES, statuses } from "constants";

const AddButton = ({ type, push, errors, showSnackbar, disabled }) => {
  const handleClick = () => {
    const errorKeys = Object.keys(errors);
    if (
      !errorKeys.length ||
      (errorKeys.length === 1 && errorKeys[0] === "agreement")
    ) {
      return push(type, undefined);
    }
    showSnackbar(MESSAGES.addClient, statuses.error, true, null);
  };

  return (
    <ButtonWrapper>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClick}
        disabled={disabled}
      >
        Добавить контрагента
      </Button>
    </ButtonWrapper>
  );
};

export default AddButton;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
`;
