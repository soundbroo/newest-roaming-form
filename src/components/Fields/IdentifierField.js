import React from "react";
import { Field } from "react-final-form";
import InputAdornment from "@material-ui/core/InputAdornment";

import TextFieldAdapter from "components/Common/TextFieldAdapter";
import EndInputAdornment from "components/Common/EndInputAdornment";

import { validate } from "utils/validate";
import { parse } from "utils/parse";

import { FIELDS_NAMES, ASTRAL_ID, HELPER_TEXT } from "constants";

const IdentifierField = ({
  inputAdornment,
  name,
  disableValidation,
  parseOperator,
  ...rest
}) => {
  const validation = () => {
    if (parseOperator) {
      return validate.operatorId;
    }
    if (!disableValidation) {
      return validate.id;
    } else {
      return validate.notRequiredId;
    }
  };

  const adornmentProps = {
    startAdornment: (
      <InputAdornment position="start">{inputAdornment}</InputAdornment>
    ),
    endAdornment: (
      <EndInputAdornment
        title={
          inputAdornment === ASTRAL_ID
            ? HELPER_TEXT.astralId
            : HELPER_TEXT.operatorId
        }
      />
    )
  };

  return (
    <Field
      name={`${name}.${FIELDS_NAMES.id.type}`}
      component={TextFieldAdapter}
      validate={validation()}
      parse={!parseOperator ? parse.id : parse.operatorId}
      label={FIELDS_NAMES.id.label}
      InputProps={inputAdornment ? adornmentProps : {}}
      {...rest}
    />
  );
};

export default IdentifierField;
