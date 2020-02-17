import React from "react";
import { Field } from "react-final-form";

import TextFieldAdapter from "components/Common/TextFieldAdapter";

import { FIELDS_NAMES } from "constants";

const RequestIdField = () => (
  <Field
    name={FIELDS_NAMES.request_id.type}
    component={TextFieldAdapter}
    label={FIELDS_NAMES.request_id.label}
  />
);

export default RequestIdField;
