import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import { MESSAGES, MAX_NUMBER_OF_FORMS, statuses } from "constants";

const AddButton = ({
  type,
  push,
  values,
  errors,
  files,
  showSnackbar,
  disabled
}) => {
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
        disabled={
          (type === "sender" && files.receiver_list) ||
          (type === "receiver" && files.sender_list) ||
          values?.[type].length >= MAX_NUMBER_OF_FORMS ||
          disabled
        }
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
