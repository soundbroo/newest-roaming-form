import React from "react";
import { Field } from "react-final-form";

import TextFieldAdapter from "components/Common/TextFieldAdapter";
import TemplateOperatorsForm from "components/Forms/OperatorsForms/TemplateOperatorsForm";

// Шаблон для страницы Операторам - Данные вашего клиента

const ClientForm = props => (
  <>
    <TemplateOperatorsForm {...props}>
      <Field
        name="request_id"
        component={TextFieldAdapter}
        label="Идентификатор заявки в системе роумингового оператора"
      />
    </TemplateOperatorsForm>
  </>
);
export default ClientForm;
