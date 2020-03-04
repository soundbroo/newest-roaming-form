import React from "react";

import IdentifierField from "components/Forms/IdentifierField";
import TemplateDefaultForm from "components/Forms/TemplateDefaultForm";
import { FormFieldsRow } from "components/Common/styled";

import { ASTRAL_ID } from "constants";
// Шаблон для страницы Операторам с полями ИНН, КПП, Название организации/ФИО, Идентификатор

const TemplateOperatorsForm = props => (
  <>
    <TemplateDefaultForm {...props} />
    <FormFieldsRow>
      <IdentifierField
        name={props.name}
        inputAdornment={props.operatorId || ASTRAL_ID}
      />
    </FormFieldsRow>
  </>
);
export default TemplateOperatorsForm;
