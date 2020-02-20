import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

const FileContent = ({ content }) => (
  <Content>
    {content?.map(row => (
      <Row>
        {row.map(cell => (
          <Cell>{cell}</Cell>
        ))}
      </Row>
    ))}
  </Content>
);

export default FileContent;

const Content = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 750px;
  height: 360px;
  padding: 18px;
  margin: 20px 0 0 0;
  overflow-y: overlay;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c5c5c5;
  }
`;

const Row = styled.div`
  display: flex;
  height: 58px;
  border-bottom: 1px solid #38383830;
  &:last-child {
    border-bottom: none;
  }
`;
const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777777;
  width: calc(750px / 7);
  font-size: 14px;
  text-align: center;
  border-right: 1px solid #38383830;
  &:last-child {
    border-right: none;
  }
`;
