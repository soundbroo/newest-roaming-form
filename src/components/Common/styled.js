import { Paper } from "@material-ui/core";
import styled from "styled-components";

export const FormFieldsWrapper = styled(Paper)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px 0;
`;

export const FormFieldsRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 12px;
`;
