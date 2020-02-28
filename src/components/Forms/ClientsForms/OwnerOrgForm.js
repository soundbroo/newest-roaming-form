import React from "react";

import EmailField from "components/Forms/EmailField";
import TemplateDefaultForm from "components/Forms/TemplateDefaultForm";
import { FormFieldsRow } from "components/Common/styled";

// Шаблон для страницы Операторам - Данные вашего клиента

const OwnerOrgForm = props => {
  const { name, isValidInn } = props;
  return (
    <>
      <TemplateDefaultForm {...props}>
        <FormFieldsRow>
          <EmailField disabled={!isValidInn} name={name} />
        </FormFieldsRow>
      </TemplateDefaultForm>
    </>
  );
};
export default OwnerOrgForm;
