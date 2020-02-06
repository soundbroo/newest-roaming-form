import React from "react";
import { TextField } from "@material-ui/core";

const TextFieldAdapter = ({ input, meta, ...rest }) => (
  <TextField
    {...input}
    {...rest}
    error={meta.touched}
    helperText={meta.touched && meta.error}
  />
);

export default TextFieldAdapter;
