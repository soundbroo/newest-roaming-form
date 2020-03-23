import React, { useEffect, useState } from "react";
import { Field } from "react-final-form";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

import { FIELDS_NAMES } from "constants";

import { required } from "utils/validate";

import AxiosService from "api";

const OperatorSelectFieldAdapter = ({ input, meta, ...rest }) => {
  const axios = new AxiosService();
  const [operators, setOperators] = useState(null);
  const fetchOperators = () => {
    return axios.operators_list().then(res => {
      setOperators(JSON.parse(res?.data?.text));
      console.log(operators);
    });
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  return (
    <FormControl {...rest}>
      <InputLabel>{FIELDS_NAMES.operator.label}</InputLabel>
      <Select
        {...input}
        error={Boolean(meta.touched && meta.error)}
        onChange={value => input.onChange(value)}
      >
        {operators &&
          Object.entries(operators).map(([value, label], index) => (
            <MenuItem key={index} value={value}>
              {label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

const OperatorSelectField = ({ name, ...rest }) => (
  <Field
    name={FIELDS_NAMES.operator.type}
    component={OperatorSelectFieldAdapter}
    validate={required}
    {...rest}
  />
);

export default OperatorSelectField;
