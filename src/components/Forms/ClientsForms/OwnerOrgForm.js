import React from "react";
import { Field } from "react-final-form";

import TextFieldAdapter from "components/Common/TextFieldAdapter";
import IdentifierField from "components/Forms/IdentifierField";
import TemplateDefaultForm from "components/Forms/TemplateDefaultForm";
import { FormFieldsRow } from "components/Common/styled";

// Шаблон для страницы Операторам - Данные вашего клиента

const OwnerOrgForm = props => (
  <>
    <TemplateDefaultForm {...props}>
      <FormFieldsRow>
        <IdentifierField
          activeForm={props.activeForm}
          stepFieldsNames={props.stepFieldsNames}
          inputAdornment="EXAMPLE"
        />
      </FormFieldsRow>
      <FormFieldsRow>
        <Field name="email" component={TextFieldAdapter} label="E-mail" />
      </FormFieldsRow>
    </TemplateDefaultForm>
  </>
);
export default OwnerOrgForm;
