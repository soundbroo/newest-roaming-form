import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";

import { StyledFormFieldsWrapper } from "components/Common/styled";

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

const DeleteButton = styled.div`
  position: absolute;
  top: 6px;
  right: 10px;
  height: 24px;
  cursor: pointer;
  z-index: 1;
`;
