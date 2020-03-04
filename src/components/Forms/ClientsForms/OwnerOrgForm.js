import React from "react";

import IdentifierField from "components/Forms/IdentifierField";
import EmailField from "components/Forms/EmailField";
import TemplateDefaultForm from "components/Forms/TemplateDefaultForm";
import { FormFieldsRow } from "components/Common/styled";

import { ASTRAL_ID } from "constants";
// Шаблон для страницы Операторам - Данные вашего клиента

const OwnerOrgForm = props => {
  const { name } = props;
  return (
    <>
      <TemplateDefaultForm {...props}>
        <FormFieldsRow>
          <IdentifierField name={name} inputAdornment={ASTRAL_ID} />
        </FormFieldsRow>
        <FormFieldsRow>
          <EmailField name={name} />
        </FormFieldsRow>
      </TemplateDefaultForm>
    </>
  );
};
export default OwnerOrgForm;
