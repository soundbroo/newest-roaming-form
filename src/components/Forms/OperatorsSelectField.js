import React from "react";
import { Field } from "react-final-form";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

import { OPERATORS, FIELDS_NAMES } from "constants";

const OperatorsSelectFieldAdapter = ({ input, meta, ...rest }) => (
  <FormControl {...rest}>
    <InputLabel>{FIELDS_NAMES.operator.label}</InputLabel>
    <Select {...input} onChange={value => input.onChange(value)}>
      {OPERATORS.map((operator, index) => (
        <MenuItem key={index} value={operator.value}>
          {operator.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const OperatorsSelectField = ({ name, ...rest }) => (
  <Field
    name={`${name}.${FIELDS_NAMES.operator.type}`}
    component={OperatorsSelectFieldAdapter}
    {...rest}
  />
);

export default OperatorsSelectField;
