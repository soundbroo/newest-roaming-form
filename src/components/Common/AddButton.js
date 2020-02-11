import React from "react";
import Button from "@material-ui/core/Button";

const AddButton = ({ type, push }) => (
  <Button
    variant="outlined"
    color="primary"
    onClick={() => push(type, undefined)}
  >
    Добавить клиента
  </Button>
);

export default AddButton;
