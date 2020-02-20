import React from "react";
import styled from "styled-components";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";

const FilePlaceholder = () => (
  <Placeholder>
    <div>Файл загружен и готов к отправке</div>
    <AssignmentOutlinedIcon />
  </Placeholder>
);

export default FilePlaceholder;

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0 50px 0;
  div {
    font-size: 18px;
    color: #777777;
    margin-bottom: 21px;
  }
  svg {
    font-size: 200px;
    color: #bcbcbc;
  }
`;
