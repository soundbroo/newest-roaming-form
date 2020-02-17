import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const AddButton = ({ type, push, ...rest }) => (
  <ButtonWrapper>
    <Button
      variant="outlined"
      color="primary"
      onClick={() => push(type, undefined)}
      {...rest}
    >
      Добавить клиента
    </Button>
  </ButtonWrapper>
);

export default AddButton;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
`;
