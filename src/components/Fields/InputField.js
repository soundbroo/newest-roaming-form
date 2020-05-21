import React from "react";
import { Field } from "react-final-form";

import TextFieldAdapter from "components/Common/TextFieldAdapter";

import { FIELDS_NAMES } from "constants";

import { validate, required } from "utils/validate";
import { parse } from "utils/parse";

const InputField = ({ name, specificName, fieldType, error, ...rest }) => {
  return (
    <Field
      key={specificName || `${name}.${fieldType}`}
      name={specificName || `${name}.${FIELDS_NAMES[fieldType].type}`}
      component={TextFieldAdapter}
      validate={validate[fieldType] ? validate[fieldType] : required}
      parse={parse[fieldType]}
      label={error || `${FIELDS_NAMES[fieldType].label}`}
      {...rest}
    />
  );
};

export default InputField;
