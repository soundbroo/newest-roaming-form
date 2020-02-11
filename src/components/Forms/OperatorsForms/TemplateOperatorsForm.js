import React from "react";

import IdentifierField from "components/Forms/IdentifierField";
import TemplateDefaultForm from "components/Forms/TemplateDefaultForm";
import { FormFieldsRow } from "components/Common/styled";

// Шаблон для страницы Операторам с полями ИНН, КПП, Название организации/ФИО, Идентификатор

const TemplateOperatorsForm = props => (
  <>
    <FormFieldsRow>{props.inputField}</FormFieldsRow>
    <TemplateDefaultForm {...props} />
    <FormFieldsRow>
      <IdentifierField
        disabled={!props.isValidInn}
        name={props.name}
        inputAdornment="EXMPL"
      />
    </FormFieldsRow>
  </>
);
export default TemplateOperatorsForm;
