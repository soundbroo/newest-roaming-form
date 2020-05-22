import React from "react";
import { Field } from "react-final-form";

import TextFieldAdapter from "components/Common/TextFieldAdapter";
import EndInputAdornment from "components/Common/EndInputAdornment";

import { validate } from "utils/validate";
import { parse } from "utils/parse";

import { FIELDS_NAMES, HELPER_TEXT } from "constants";

const TicketField = ({ error, ...rest }) => {
  const adornmentProps = {
    endAdornment: <EndInputAdornment title={HELPER_TEXT.ticket_number} />,
  };
  return (
    <Field
      name={`ticket_number`}
      validate={validate.ticket_number}
      parse={parse.ticket_number}
      component={TextFieldAdapter}
      label={error || FIELDS_NAMES.ticket_number.label}
      InputProps={adornmentProps}
      {...rest}
    />
  );
};

export default TicketField;
