import React from "react";

import { FieldArray } from "react-final-form-arrays";

import FormFieldsWrapper from "components/Common/FormFieldsWrapper";
import ClientForm from "components/Forms/OperatorsForms/ClientForm";
import AOContragentsForm from "components/Forms/OperatorsForms/AOContragentsForm";
import InputValidationForm from "components/Forms/InputValidationForm";

const OperatorsPage = ({ activeForm, activeFormProps, values, push }) => {
  switch (activeForm) {
    case 0:
      return (
        <>
          <FieldArray name="sender">
            {({ fields }) =>
              fields.map((name, index) => (
                <FormFieldsWrapper>
                  <ClientForm key={name} name={name} />
                </FormFieldsWrapper>
              ))
            }
          </FieldArray>
          <button type="button" onClick={() => push("sender", undefined)}>
            Добавить клиента
          </button>
        </>
      );
    case 1:
      return (
        <>
          <FieldArray name="receiver">
            {({ fields }) =>
              fields.map((name, index) => (
                <FormFieldsWrapper>
                  <AOContragentsForm key={name} name={name} />
                </FormFieldsWrapper>
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
          key={6}
          values={values}
          buttonProps={activeFormProps}
        />
      );
  }
};

export default OperatorsPage;
