import React from "react";
import { Field } from "react-final-form";
import InputAdornment from "@material-ui/core/InputAdornment";

import { validateId } from "utils/validate";
import { parseId } from "utils/parse";

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
      name={`${name}.${FIELDS_NAMES.id.type}`}
      component={TextFieldAdapter}
      parse={parseId}
      validate={validateId}
      label={FIELDS_NAMES.id.label}
      InputProps={inputAdornment ? adornmentProps : {}}
      {...rest}
    />
  );
};

export default IdentifierField;
