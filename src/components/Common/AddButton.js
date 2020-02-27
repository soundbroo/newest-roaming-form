import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import { MESSAGES } from "constants";

const AddButton = ({
  type,
  push,
  errors,
  messageState: { setMessage },
  openState: { setOpen },
  ...rest
}) => {
  const handleClick = () => {
    if (!Object.keys(errors).length) {
      return push(type, undefined);
    }
    setMessage(MESSAGES.addClient);
    setOpen(true);
  };

  return (
    <ButtonWrapper>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClick}
        {...rest}
      >
        Добавить клиента
      </Button>
    </ButtonWrapper>
  );
};

export default AddButton;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
`;
