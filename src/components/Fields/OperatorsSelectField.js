import React from "react";
import { Field } from "react-final-form";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

import { OPERATORS, FIELDS_NAMES } from "constants";

import { required } from "utils/validate";
import RenderCounter from "utils/renderCounter";

const OperatorSelectFieldAdapter = ({ input, meta, ...rest }) => (
  <FormControl {...rest}>
    <InputLabel>{FIELDS_NAMES.operator.label}</InputLabel>
    <Select
      {...input}
      error={Boolean(meta.touched && meta.error)}
      onChange={value => input.onChange(value)}
    >
      {OPERATORS.map((operator, index) => (
        <MenuItem key={index} value={operator.value}>
          {operator.label}
        </MenuItem>
      ))}
    </Select>
    <RenderCounter />
  </FormControl>
);

const OperatorSelectField = ({ name, ...rest }) => (
  <Field
    name={FIELDS_NAMES.operator.type}
    component={OperatorSelectFieldAdapter}
    validate={required}
    {...rest}
  />
);

export default OperatorSelectField;
