import React from "react";
import { Field } from "react-final-form";
import InputAdornment from "@material-ui/core/InputAdornment";

import { required } from "utils/validate";

import { FIELDS_NAMES } from "constants";

import TextFieldAdapter from "components/Common/TextFieldAdapter";

const EmailField = ({ name, ...rest }) => (
  <Field
    name={`${name}.email`}
    component={TextFieldAdapter}
    label="E-mail"
    {...rest}
  />
);

export default EmailField;
