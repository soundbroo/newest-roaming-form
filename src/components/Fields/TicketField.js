import React from "react";
import { Field } from "react-final-form";

import TextFieldAdapter from "components/Common/TextFieldAdapter";

import { validate } from "utils/validate";
import { parse } from "utils/parse";

import { HELPER_TEXT } from "constants";

const TicketField = ({ error, ...rest }) => (
  <Field
    name={`ticket_number`}
    validate={validate.ticket_number}
    parse={parse.ticket_number}
    component={TextFieldAdapter}
    label={error || "Номер приглашения"}
    {...rest}
  />
);

export default TicketField;
