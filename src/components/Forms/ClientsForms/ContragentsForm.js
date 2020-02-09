import React from "react";
import { FormFieldsRow } from "components/Common/styled";

import TemplateDefaultForm from "components/Forms/TemplateDefaultForm";

// Шаблон для страницы Операторам - Данные вашего клиента

const ContragentsForm = props => (
  <TemplateDefaultForm {...props}>
    <FormFieldsRow></FormFieldsRow>
  </TemplateDefaultForm>
);
export default ContragentsForm;
