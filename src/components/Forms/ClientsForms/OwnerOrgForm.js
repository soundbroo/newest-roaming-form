import React, { useEffect } from "react";

import IdentifierField from "components/Fields/IdentifierField";
import EmailField from "components/Fields/EmailField";
import TicketField from "components/Fields/TicketField";
import TemplateDefaultForm from "components/Forms/TemplateDefaultForm";
import { FormFieldsRow } from "components/Common/styled";

import { ASTRAL_ID } from "constants";
// Шаблон для страницы Операторам - Данные вашего клиента

const OwnerOrgForm = (props) => {
  const { name, ticket, formApi } = props;

  useEffect(() => {
    ticket && formApi?.change && formApi?.change("ticket_number", ticket);
  }, [ticket]);

  return (
    <>
      <TemplateDefaultForm {...props}>
        <FormFieldsRow>
          <IdentifierField name={name} inputAdornment={ASTRAL_ID} />
        </FormFieldsRow>
        <FormFieldsRow>
          <EmailField name={name} />
        </FormFieldsRow>
        <FormFieldsRow>
          <TicketField />
        </FormFieldsRow>
      </TemplateDefaultForm>
    </>
  );
};
export default OwnerOrgForm;
