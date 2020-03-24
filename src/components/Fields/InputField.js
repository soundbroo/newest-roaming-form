import React from "react";
import { Field } from "react-final-form";

import TextFieldAdapter from "components/Common/TextFieldAdapter";

import { FIELDS_NAMES } from "constants";

import { validate, required } from "utils/validate";
import { parse } from "utils/parse";

const InputField = ({ name, fieldType, error, ...rest }) => {
  return (
    <Field
      key={`${name}.${fieldType}`}
      name={`${name}.${FIELDS_NAMES[fieldType].type}`}
      component={TextFieldAdapter}
      validate={validate[fieldType] ? validate[fieldType] : required}
      parse={parse[fieldType]}
      label={error || `${FIELDS_NAMES[fieldType].label}`}
      {...rest}
    />
  );
};

export default InputField;
