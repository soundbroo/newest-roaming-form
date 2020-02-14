import React from "react";
import { Field } from "react-final-form";
import InputAdornment from "@material-ui/core/InputAdornment";

import { required } from "utils/validate";

import { FIELDS_NAMES } from "constants";

import TextFieldAdapter from "components/Common/TextFieldAdapter";

const IdentifierField = ({ inputAdornment, name, ...rest }) => {
  const adornmentProps = {
    startAdornment: (
      <InputAdornment position="start">{inputAdornment}</InputAdornment>
    )
  };

  return (
    <Field
      name={FIELDS_NAMES.id.type}
      component={TextFieldAdapter}
      validate={required}
      label={FIELDS_NAMES.id.label}
      InputProps={inputAdornment ? adornmentProps : {}}
      {...rest}
    />
  );
};

export default IdentifierField;
