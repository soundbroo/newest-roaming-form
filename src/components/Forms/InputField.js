import React from "react";
import { Field } from "react-final-form";

import TextFieldAdapter from "components/Common/TextFieldAdapter";

import { FIELDS_NAMES } from "constants";

import { required } from "utils/validate";

const InputField = ({ name, fieldType }) => (
  <Field
    name={`${name}.${FIELDS_NAMES[fieldType].type}`}
    component={TextFieldAdapter}
    validate={required}
    label={FIELDS_NAMES[fieldType].label}
  />
);

export default InputField;
