import React from "react";
import { Field } from "react-final-form";

import TextFieldAdapter from "components/Common/TextFieldAdapter";

import { FIELDS_NAMES } from "constants";

import { required } from "utils/validate";

const RequestIdField = ({ error }) => (
  <Field
    name={FIELDS_NAMES.request_id.type}
    component={TextFieldAdapter}
    validate={required}
    label={error || `${FIELDS_NAMES.request_id.label}`}
  />
);

export default RequestIdField;
