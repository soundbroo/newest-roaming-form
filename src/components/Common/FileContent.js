import React from "react";
import { Card, Row, Cell } from "components/Common/styled";
import TextField from "@material-ui/core/TextField";

const FileContent = ({ name, content }) => (
  <>
    {content?.map((el, index) => (
      <Card key={`${name}${index}`}>
        {Object.entries(el).map(([label, value], index) => (
          <Row key={`${name}${index}`}>
            <Cell>{label.replace(/\./g, "")}</Cell>
            <Cell>
              <TextField
                variant="outlined"
                size="small"
                value={value}
                disabled
              />
            </Cell>
          </Row>
        ))}
      </Card>
    ))}
  </>
);

export default FileContent;
