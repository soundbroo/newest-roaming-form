import React from "react";
import styled from "styled-components";
import { FormFieldsRow } from "components/Common/styled";
import OperatorsSelectField from "components/Forms/OperatorsSelectField";
import TemplateDefaultForm from "components/Forms/TemplateDefaultForm";

// Шаблон для страницы Операторам - Данные вашего клиента

const ContragentsForm = props => {
  const { isValidInn, name } = props;
  return (
    <TemplateDefaultForm {...props}>
      <FormFieldsRow>
        <OperatorsSelectField disabled={!isValidInn} name={name} />
      </FormFieldsRow>
    </TemplateDefaultForm>
  );
};
export default ContragentsForm;
