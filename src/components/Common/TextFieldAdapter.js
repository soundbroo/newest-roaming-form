import React from "react";
import { TextField } from "@material-ui/core";
import RenderCounter from "utils/renderCounter";

const TextFieldAdapter = ({ input, meta, ...rest }) => (
  <>
    <TextField
      {...input}
      {...rest}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error}
    />
    <RenderCounter />
  </>
);

export default TextFieldAdapter;
