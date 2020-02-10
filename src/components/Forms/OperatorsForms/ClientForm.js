import React from "react";
import { Field } from "react-final-form";

import TextFieldAdapter from "components/Common/TextFieldAdapter";
import TemplateOperatorsForm from "components/Forms/OperatorsForms/TemplateOperatorsForm";

import { FIELDS_NAMES } from "constants";

// Шаблон для страницы Операторам - Данные вашего клиента
// Тут баг, дважды рендерится поле, возможно что-то с ключами
const ClientForm = props => (
  <>
    <TemplateOperatorsForm {...props}>
      <Field
        name={`${props.name}.${FIELDS_NAMES.request_id.type}`}
        component={TextFieldAdapter}
        label={FIELDS_NAMES.request_id.label}
      />
    </TemplateOperatorsForm>
  </>
);
export default ClientForm;
