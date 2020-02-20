import React from "react";
import styled from "styled-components";
import { FieldArray } from "react-final-form-arrays";

import AddButton from "components/Common/AddButton";
import FileContent from "components/Common/FileContent";
import FormFieldsWrapper from "components/Common/FormFieldsWrapper";
import OpenModalButton from "components/Common/UploadModal";
import UploadField from "components/Forms/UploadField";
import OwnerOrgForm from "components/Forms/ClientsForms/OwnerOrgForm";
import ContragentsForm from "components/Forms/ClientsForms/ContragentsForm";
import ClientForm from "components/Forms/OperatorsForms/ClientForm";
import AOContragentsForm from "components/Forms/OperatorsForms/AOContragentsForm";
import InputValidationForm from "components/Forms/InputValidationForm";
import RequestIdField from "components/Forms/RequestIdField";

import useFileContent from "hooks/useFileContent";

import {
  BUTTON_TITLES,
  OPERATORS_WITH_REQUEST_ID,
  OPERATORS_WITH_AGREEMENT
} from "constants";

import { required, disableAllBesidesInn } from "utils/validate";

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
  const isFileLoaded = name => Boolean(fileProps.files?.[`${name}_list`]);

  const [content, setContent] = useFileContent();

  const renderForm = (activePage, firstPage, secondPage) => {
    switch (activePage) {
      case 0:
        return firstPage;
      case 1:
        return secondPage;
    }
  };

  const renderSenderFieldArray = () => {
    if (!isFileLoaded("sender"))
      return (
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
                    files={fileProps.files}
                    {...disableAllBesidesInn({ name, index, values })}
                  />
                )}
              </FormFieldsWrapper>
            ))
          }
        </FieldArray>
      );
  };

  const renderReceiverFieldArray = () => {
    if (!isFileLoaded("receiver"))
      return (
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
                    files={fileProps.files}
                    isFileLoaded={fileProps.isFileLoaded}
                    formApi={formApi}
                    {...disableAllBesidesInn({ name, index, values })}
                  />,
                  <AOContragentsForm
                    key={name}
                    name={name}
                    index={index}
                    values={values}
                    files={fileProps.files}
                    {...disableAllBesidesInn({ name, index, values })}
                  />
                )}
              </FormFieldsWrapper>
            ))
          }
        </FieldArray>
      );
  };

  const renderAgreementFiled = () => {
    if (activePage === 0) {
      const operator = values?.receiver?.find(data => data?.operator);

      if (OPERATORS_WITH_AGREEMENT.includes(operator?.operator))
        return (
          <AgreementField>
            <UploadField
              validate={required}
              name="agreement"
              title={BUTTON_TITLES.uploadAgreement}
            />
          </AgreementField>
        );
    }
    return;
  };

  const renderAddButton = type => {
    if (!isFileLoaded(type)) {
      if (activePage === 0 && activeForm === 0) return;

      const disabled = () => {
        if (type === "sender" && values.receiver.length > 1) return true;
        if (type === "receiver" && values.sender.length > 1) return true;
      };

      return <AddButton disabled={disabled(type)} type={type} push={push} />;
    }
  };

  const renderRequestIdField = () => {
    if (
      !isFileLoaded("sender") &&
      activePage === 1 &&
      OPERATORS_WITH_REQUEST_ID.includes(operatorId)
    )
      return <RequestIdField />;
  };

  const renderFileContent = name => {
    if (isFileLoaded(name)) return <FileContent content={content} />;
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
                setContent={setContent}
                formApi={formApi}
                {...fileProps}
              />
            )}
          </TypeDataTitle>
          {renderRequestIdField()}
          {renderSenderFieldArray()}
          {renderFileContent("sender")}
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
              setContent={setContent}
              formApi={formApi}
              {...fileProps}
            />
          </TypeDataTitle>
          {renderReceiverFieldArray()}
          {renderFileContent("receiver")}
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
          files={fileProps.files}
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
