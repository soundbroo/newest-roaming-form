import React from "react";
import { Field } from "react-final-form";

import TextFieldAdapter from "components/Common/TextFieldAdapter";

import { validate } from "utils/validate";

const EmailField = ({ name, ...rest }) => (
  <Field
    name={`${name}.email`}
    validate={validate.email}
    component={TextFieldAdapter}
    label="E-mail"
    {...rest}
  />
);

export default EmailField;
