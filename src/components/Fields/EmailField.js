import React from "react";
import { Field } from "react-final-form";
import EndInputAdornment from "components/Common/EndInputAdornment";

import TextFieldAdapter from "components/Common/TextFieldAdapter";

import { validate } from "utils/validate";

import { HELPER_TEXT } from "constants";

const EmailField = ({ name, ...rest }) => {
  const adornmentProps = {
    endAdornment: <EndInputAdornment title={HELPER_TEXT.email} />
  };
  return (
    <Field
      name={`${name}.email`}
      validate={validate.email}
      component={TextFieldAdapter}
      label="E-mail"
      InputProps={adornmentProps}
      {...rest}
    />
  );
};

export default EmailField;
