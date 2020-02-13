import React from "react";
import { Field } from "react-final-form";
import InputAdornment from "@material-ui/core/InputAdornment";

import { FIELDS_NAMES } from "constants";

import TextFieldAdapter from "components/Common/TextFieldAdapter";

import { required, validateEmail } from "utils/validate";

const EmailField = ({ name, ...rest }) => (
  <Field
    name={`${name}.email`}
    validate={validateEmail}
    component={TextFieldAdapter}
    label="E-mail"
    {...rest}
  />
);

export default EmailField;
