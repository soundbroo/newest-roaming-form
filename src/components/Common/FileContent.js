import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

import { Content } from "components/Common/styled";

const FileContent = ({ content }) => (
  <Content>
    {content?.map((el, index) => (
      <Card key={index}>
        {Object.entries(el).map(([label, value], index) => (
          <Row key={index}>
            <Cell>{label}:</Cell>
            <Cell>{value}</Cell>
          </Row>
        ))}
      </Card>
    ))}
  </Content>
);

export default FileContent;

const Card = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 6px 18px;
  margin: 20px 0 0 0;
  &:first-child {
    margin: 0;
  }
`;

const Row = styled.div`
  display: flex;
  min-height: 36px;
  justify-content: space-between;
  align-items: center;
  border-bottom: thin solid #cecece3b;
  &:last-child {
    border: none;
  }
`;
const Cell = styled.div`
  display: flex;
  align-items: center;
  color: #777777;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:first-child {
    flex: 70%;
  }
  &:last-child {
    flex: 30%;
  }
`;
