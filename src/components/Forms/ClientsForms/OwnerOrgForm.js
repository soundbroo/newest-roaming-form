import React from "react";

import IdentifierField from "components/Forms/IdentifierField";
import EmailField from "components/Forms/EmailField";
import TemplateDefaultForm from "components/Forms/TemplateDefaultForm";
import { FormFieldsRow } from "components/Common/styled";

// Шаблон для страницы Операторам - Данные вашего клиента

const OwnerOrgForm = props => {
  const { activeForm, stepFieldsNames, name } = props;

  return (
    <>
      <TemplateDefaultForm {...props}>
        <FormFieldsRow>
          <IdentifierField inputAdornment="EXAMPLE" name={name} />
        </FormFieldsRow>
        <FormFieldsRow>
          <EmailField name={name} />
        </FormFieldsRow>
      </TemplateDefaultForm>
    </>
  );
};
export default OwnerOrgForm;
