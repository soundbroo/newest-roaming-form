import React from "react";
import { Field } from "react-final-form";
import InputAdornment from "@material-ui/core/InputAdornment";

import { required } from "utils/validate";

import TextFieldAdapter from "components/Common/TextFieldAdapter";

const IdentifierField = ({ stepFieldsNames, activeForm, inputAdornment }) => {
  const adornmentProps = {
    startAdornment: (
      <InputAdornment position="start">{inputAdornment}</InputAdornment>
    )
  };

  return (
    <Field
      name={stepFieldsNames[activeForm].id}
      component={TextFieldAdapter}
      validate={required}
      label="Идентификатор"
      InputProps={inputAdornment ? adornmentProps : {}}
    />
  );
};

export default IdentifierField;
