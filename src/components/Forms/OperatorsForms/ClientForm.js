import React from "react";
import { Form, Field } from "react-final-form";
import styled from "styled-components";

import TextFieldAdapter from "components/Common/TextFieldAdapter";
import { FormFieldsWrapper, FormFieldsRow } from "components/Common/styled";
import TemplateOperatorsForm from "components/Forms/OperatorsForms/TemplateOperatorsForm";

// Шаблон для страницы Операторам - Данные вашего клиента

const ClientForm = ({ activeForm, stepFieldsNames, values }) => (
  <>
    <Field
      name="request_id"
      component={TextFieldAdapter}
      label="Идентификатор заявки в системе роумингового оператора"
    />
    <TemplateOperatorsForm
      activeForm={activeForm}
      stepFieldsNames={stepFieldsNames}
      values={values}
    />
  </>
);
export default ClientForm;
