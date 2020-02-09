import React from "react";

import IdentifierField from "components/Forms/IdentifierField";
import FormFieldsWrapper from "components/Common/FormFieldsWrapper";
import TemplateDefaultForm from "components/Forms/TemplateDefaultForm";
import { FormFieldsRow } from "components/Common/styled";

// Инпуты для формы операторов

// Шаблон для страницы Операторам с полями ИНН, КПП, Название организации/ФИО, Идентификатор

const TemplateOperatorsForm = ({
  children,
  activeForm,
  stepFieldsNames,
  deleteForm,
  index
}) => (
  <FormFieldsWrapper deleteForm={() => deleteForm(index)}>
    <div>{index}</div>
    <FormFieldsRow>{children}</FormFieldsRow>
    <TemplateDefaultForm
      activeForm={activeForm}
      stepFieldsNames={stepFieldsNames}
    />
    <FormFieldsRow>
      <IdentifierField
        activeForm={activeForm}
        stepFieldsNames={stepFieldsNames}
      />
    </FormFieldsRow>
  </FormFieldsWrapper>
);
export default TemplateOperatorsForm;
