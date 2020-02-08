import React from "react";
import { Field } from "react-final-form";

import TextFieldAdapter from "components/Common/TextFieldAdapter";
import TemplateOperatorsForm from "components/Forms/OperatorsForms/TemplateOperatorsForm";

// Шаблон для страницы Операторам - Данные вашего клиента

const OwnerOrgForm = props => (
  <>
    <TemplateOperatorsForm {...props} />
    <Field name="email" component={TextFieldAdapter} label="E-mail" />
  </>
);
export default OwnerOrgForm;
