import React from "react";
import styled from "styled-components";
import { FieldArray } from "react-final-form-arrays";

import AddButton from "components/Common/AddButton";
import FormFieldsWrapper from "components/Common/FormFieldsWrapper";
import OpenModalButton from "components/Common/UploadModal";
import UploadField from "components/Forms/UploadField";
import OwnerOrgForm from "components/Forms/ClientsForms/OwnerOrgForm";
import ContragentsForm from "components/Forms/ClientsForms/ContragentsForm";
import ClientForm from "components/Forms/OperatorsForms/ClientForm";
import AOContragentsForm from "components/Forms/OperatorsForms/AOContragentsForm";
import InputValidationForm from "components/Forms/InputValidationForm";

import { BUTTON_TITLES } from "constants";

import { disableAllBesidesInn } from "utils/validate";

const Page = ({
  activePage,
  activeForm,
  activeFormProps,
  typeDataTitle,
  values,
  push
}) => {
  const renderForm = (activePage, firstPage, secondPage) => {
    switch (activePage) {
      case 0:
        return firstPage;
      case 1:
        return secondPage;
    }
  };

  const renderAgreementFiled = () => {
    if (activePage === 0 && values?.receiver?.find(data => data?.operator))
      return (
        <AgreementField>
          <UploadField name="agreement" title={BUTTON_TITLES.uploadAgreement} />
        </AgreementField>
      );
    return;
  };

  const renderAddButton = type => {
    if (activePage === 0 && activeForm === 0) return;
    return <AddButton type={type} push={push} />;
  };

  switch (activeForm) {
    case 0:
      return (
        <>
          <TypeDataTitle>
            {typeDataTitle}
            {activePage === 1 && <OpenModalButton name="sender_list" />}
          </TypeDataTitle>
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
          {renderAddButton("sender")}
        </>
      );
    case 1:
      return (
        <>
          <TypeDataTitle>
            {typeDataTitle}
            <OpenModalButton name="receiver_list" />
          </TypeDataTitle>
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
          {renderAgreementFiled()}
          {renderAddButton("receiver")}
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

const TypeDataTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  width: 100%;
  font-size: 18px;
`;

const AgreementField = styled.div`
  margin: 12px 0;
`;
