import React from "react";
import Button from "@material-ui/core/Button";

import { FieldArray } from "react-final-form-arrays";

import FormFieldsWrapper from "components/Common/FormFieldsWrapper";
import OwnerOrgForm from "components/Forms/ClientsForms/OwnerOrgForm";
import ContragentsForm from "components/Forms/ClientsForms/ContragentsForm";
import InputValidationForm from "components/Forms/InputValidationForm";

const ClientsPage = ({ activeForm, activeFormProps, values, push }) => {
  switch (activeForm) {
    case 0:
      return (
        <>
          <FieldArray name="sender">
            {({ fields }) =>
              fields.map((name, index) => (
                <FormFieldsWrapper>
                  <OwnerOrgForm key={name} name={name} />
                </FormFieldsWrapper>
              ))
            }
          </FieldArray>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => push("sender", undefined)}
          >
            Добавить клиента
          </Button>
        </>
      );
    case 1:
      return (
        <>
          <FieldArray name="receiver">
            {({ fields }) =>
              fields.map((name, index) => (
                <ContragentsForm key={name} name={name} />
              ))
            }
          </FieldArray>
          <button type="button" onClick={() => push("receiver", undefined)}>
            Добавить получателя
          </button>
        </>
      );
    case 2:
      return (
        <InputValidationForm
          key={3}
          values={values}
          buttonProps={activeFormProps}
        />
      );
  }
};

export default ClientsPage;
