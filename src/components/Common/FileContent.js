import React from "react";
import { Content, Card, Row, Cell } from "components/Common/styled";

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
