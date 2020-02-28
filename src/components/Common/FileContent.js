import React from "react";
import { Card, Row, Cell } from "components/Common/styled";

const FileContent = ({ content }) => {
  return (
    <>
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
    </>
  );
};

export default FileContent;
