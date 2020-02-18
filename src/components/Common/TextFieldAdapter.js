import React from "react";
import { TextField } from "@material-ui/core";

const TextFieldAdapter = ({ input, meta, ...rest }) => (
  <TextField
    {...input}
    {...rest}
    error={Boolean(meta.touched && meta.error)}
    helperText={meta.touched && meta.error}
  />
);

export default TextFieldAdapter;
