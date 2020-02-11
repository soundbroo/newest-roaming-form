import React from "react";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";

const FormFieldsWrapper = ({ children, index, remove }) => (
  <StyledFormFieldsWrapper>
    {index !== 0 && (
      <DeleteButton onClick={remove}>
        <DeleteIcon color="disabled" />
      </DeleteButton>
    )}
    {children}
  </StyledFormFieldsWrapper>
);

export default FormFieldsWrapper;

export const StyledFormFieldsWrapper = styled(Paper)`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 32px 0 9px 0;
  padding: 9px 0;
`;

export const DeleteButton = styled.div`
  position: absolute;
  top: 6px;
  right: 10px;
  height: 24px;
  cursor: pointer;
  z-index: 1;
`;
