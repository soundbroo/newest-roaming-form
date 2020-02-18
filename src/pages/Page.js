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
import RequestIdField from "components/Forms/RequestIdField";

import { BUTTON_TITLES } from "constants";

import { disableAllBesidesInn } from "utils/validate";

const Page = ({
  formApi,
  activePage,
  activeForm,
  activeFormProps,
  typeDataTitle,
  values,
  push,
  operatorId,
  fileProps
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

    const disabled = () => {
      if (type === "sender" && values.receiver.length > 1) return true;
      if (type === "receiver" && values.sender.length > 1) return true;
    };

    return <AddButton disabled={disabled(type)} type={type} push={push} />;
  };

  switch (activeForm) {
    case 0:
      return (
        <PageWrapper>
          <TypeDataTitle>
            {typeDataTitle}
            {activePage === 1 && (
              <OpenModalButton
                key="sender_list"
                name="sender_list"
                values={values}
                formApi={formApi}
                {...fileProps}
              />
            )}
          </TypeDataTitle>
          {activePage === 1 && <RequestIdField />}
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
                      operatorId={operatorId}
                      {...disableAllBesidesInn({ name, index, values })}
                    />
                  )}
                </FormFieldsWrapper>
              ))
            }
          </FieldArray>
          {renderAddButton("sender")}
        </PageWrapper>
      );
    case 1:
      return (
        <PageWrapper>
          <TypeDataTitle>
            {typeDataTitle}
            <OpenModalButton
              key="receiver_list"
              name="receiver_list"
              values={values}
              formApi={formApi}
              {...fileProps}
            />
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
        </PageWrapper>
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

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

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
  width: 100%;
`;
