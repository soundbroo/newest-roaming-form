import React from "react";
import { Field } from "react-final-form";
import InputAdornment from "@material-ui/core/InputAdornment";
import MaskedInput from "react-text-mask";

import { validateId } from "utils/validate";
import { identifierMask } from "utils/mask";

import { FIELDS_NAMES } from "constants";

import TextFieldAdapter from "components/Common/TextFieldAdapter";

const TextMaskCustom = props => {
  const { inputRef, ...rest } = props;

  return (
    <MaskedInput
      {...rest}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={identifierMask}
      placeholderChar={"\u2000"}
      // showMask
    />
  );
};

const IdentifierField = ({ inputAdornment, name, ...rest }) => {
  const adornmentProps = {
    inputComponent: TextMaskCustom,
    startAdornment: (
      <InputAdornment position="start">{inputAdornment}</InputAdornment>
    )
  };

  return (
    <Field
      name={`${name}.${FIELDS_NAMES.id.type}`}
      component={TextFieldAdapter}
      validate={validateId}
      label={FIELDS_NAMES.id.label}
      InputProps={inputAdornment ? adornmentProps : {}}
      {...rest}
    />
  );
};

export default IdentifierField;
