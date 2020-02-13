import React from "react";
import { Field } from "react-final-form";

import UploadButtonAdapter from "components/Common/UploadButtonAdapter";

const UploadField = ({ ...props }) => (
  <Field component={UploadButtonAdapter} {...props} />
);

export default UploadField;
