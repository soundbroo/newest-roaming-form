import React, { useEffect, useState } from "react";
import { Field } from "react-final-form";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

import { FIELDS_NAMES } from "constants";

import { required } from "utils/validate";

import AxiosService from "api";

const OperatorSelectFieldAdapter = ({ input, meta, ...rest }) => {
  const axios = new AxiosService();
  const [operators, setOperators] = useState(null);

  const sortOperators = () => {
    const array = operators && [...Object.values(operators)];
    const withoutPrefix = array?.map(el =>
      el.replace(/ОАО |ЗАО |ООО |АО /g, "")
    );

    let sortedOperators = Object.fromEntries(
      withoutPrefix.sort().map(el => [el.substr(-3, 3), el])
    );

    for (let key in sortedOperators) {
      sortedOperators[key] = operators[key];
    }

    return sortedOperators;
  };

  const fetchOperators = async () => {
    return await axios.operators_list().then(res => {
      setOperators(JSON.parse(res?.data?.text));
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
          Object.entries(sortOperators()).map(([value, label], index) => (
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
