import React from "react";
import { Field } from "react-final-form";
import InputAdornment from "@material-ui/core/InputAdornment";

import TextFieldAdapter from "components/Common/TextFieldAdapter";

import { validate } from "utils/validate";
import { parseId } from "utils/parse";

import { FIELDS_NAMES } from "constants";

const IdentifierField = ({ inputAdornment, name, ...rest }) => {
  const adornmentProps = {
    startAdornment: (
      <InputAdornment position="start">{inputAdornment}</InputAdornment>
    )
  };

  return (
    <Field
      name={name}
      component={TextFieldAdapter}
      validate={validate.id}
      parse={parseId}
      label={FIELDS_NAMES.id.label}
      InputProps={inputAdornment ? adornmentProps : {}}
      {...rest}
    />
  );
};

export default IdentifierField;
