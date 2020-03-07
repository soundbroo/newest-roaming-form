import React from "react";
import { Card, Row, Cell } from "components/Common/styled";

const FileContent = ({ name, content }) => (
  <>
    {content?.map((el, index) => (
      <Card key={`${name}${index}`}>
        {Object.entries(el).map(([label, value], index) => (
          <Row key={`${name}${index}`}>
            <Cell>{label}:</Cell>
            <Cell>{value}</Cell>
          </Row>
        ))}
      </Card>
    ))}
  </>
);

export default FileContent;
