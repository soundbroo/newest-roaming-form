import React from "react";
import { FieldArray } from "react-final-form-arrays";

import AddButton from "components/Common/AddButton";

import FormFieldsWrapper from "components/Common/FormFieldsWrapper";
import OwnerOrgForm from "components/Forms/ClientsForms/OwnerOrgForm";
import ContragentsForm from "components/Forms/ClientsForms/ContragentsForm";
import ClientForm from "components/Forms/OperatorsForms/ClientForm";
import AOContragentsForm from "components/Forms/OperatorsForms/AOContragentsForm";
import InputValidationForm from "components/Forms/InputValidationForm";

import { disableAllBesidesInn } from "utils/validate";

const Page = ({ activePage, activeForm, activeFormProps, values, push }) => {
  const renderForm = (activePage, firstPage, secondPage) => {
    switch (activePage) {
      case 0:
        return firstPage;
      case 1:
        return secondPage;
    }
  };

  switch (activeForm) {
    case 0:
      return (
        <>
          <FieldArray key="sender" name="sender">
            {({ fields }) =>
              fields.map((name, index) => (
                <FormFieldsWrapper
                  key={name}
                  index={index}
                  remove={() => fields.remove(index)}
                >
                  {renderForm(
                    activePage,
                    <OwnerOrgForm
                      key={name}
                      name={name}
                      index={index}
                      values={values}
                      {...disableAllBesidesInn({ name, index, values })}
                    />,
                    <ClientForm
                      key={name}
                      name={name}
                      index={index}
                      values={values}
                      {...disableAllBesidesInn({ name, index, values })}
                    />
                  )}
                </FormFieldsWrapper>
              ))
            }
          </FieldArray>
          <AddButton type="sender" push={push} />
        </>
      );
    case 1:
      return (
        <>
          <FieldArray key="receiver" name="receiver">
            {({ fields }) =>
              fields.map((name, index) => (
                <FormFieldsWrapper
                  key={name}
                  index={index}
                  remove={() => fields.remove(index)}
                >
                  {renderForm(
                    activePage,
                    <ContragentsForm
                      key={name}
                      name={name}
                      index={index}
                      values={values}
                      {...disableAllBesidesInn({ name, index, values })}
                    />,
                    <AOContragentsForm
                      key={name}
                      name={name}
                      index={index}
                      values={values}
                      {...disableAllBesidesInn({ name, index, values })}
                    />
                  )}
                </FormFieldsWrapper>
              ))
            }
          </FieldArray>
          <AddButton type="receiver" push={push} />
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

export default Page;
