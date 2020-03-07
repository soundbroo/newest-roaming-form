import React from "react";
import styled from "styled-components";
import { FieldArray } from "react-final-form-arrays";

import WrappedFieldsRows from "components/Common/WrappedFieldsRows";
import AddButton from "components/Common/AddButton";
import FileContent from "components/Common/FileContent";
import FormFieldsWrapper from "components/Common/FormFieldsWrapper";
import OpenModalButton from "components/Common/UploadModal";
import SelectedFileChip from "components/Common/SelectedFileChip";
import Link from "components/Common/Link";
import { Content } from "components/Common/styled";
import UploadField from "components/Fields/UploadField";
import OwnerOrgForm from "components/Forms/ClientsForms/OwnerOrgForm";
import ContragentsForm from "components/Forms/ClientsForms/ContragentsForm";
import ClientForm from "components/Forms/OperatorsForms/ClientForm";
import AOContragentsForm from "components/Forms/OperatorsForms/AOContragentsForm";
import InputValidationForm from "components/Forms/InputValidationForm";
import RequestIdField from "components/Fields/RequestIdField";
import OperatorSelectField from "components/Fields/OperatorsSelectField";

import { FIELDS_NAMES, LINK_TITLES } from "constants";
import { AGREEMENT_TEMPLATE } from "constants/links";

import useFileContent from "hooks/useFileContent";

import {
  BUTTON_TITLES,
  OPERATORS_WITH_REQUEST_ID,
  OPERATORS_WITH_AGREEMENT
} from "constants";

import { required, disableRules } from "utils/validate";

const Page = ({
  formApi,
  snackbarProps,
  activePage,
  activeForm,
  activeFormProps,
  authProps,
  typeDataTitle,
  values,
  errors,
  setValidationErrors,
  push,
  remove,
  response,
  setResponse,
  setXlsSaver,
  operatorId,
  fileProps,
  fileSaverSwitcher,
  setFileSaverSwitcher
}) => {
  const isFileLoaded = name => Boolean(fileProps.files?.[name]);

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
    if (!isFileLoaded("sender_list"))
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
                    remove={remove}
                    formApi={formApi}
                    {...disableRules({ name, index, values })}
                  />,
                  <ClientForm
                    key={name}
                    name={name}
                    index={index}
                    values={values}
                    remove={remove}
                    operatorId={operatorId}
                    files={fileProps.files}
                    formApi={formApi}
                    {...disableRules({ name, index, values })}
                  />
                )}
              </FormFieldsWrapper>
            ))
          }
        </FieldArray>
      );
  };

  const renderReceiverFieldArray = () => {
    if (!isFileLoaded("receiver_list"))
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
                    remove={remove}
                    files={fileProps.files}
                    isFileLoaded={fileProps.isFileLoaded}
                    formApi={formApi}
                    {...disableRules({ name, index, values })}
                  />,
                  <AOContragentsForm
                    key={name}
                    name={name}
                    index={index}
                    values={values}
                    remove={remove}
                    files={fileProps.files}
                    formApi={formApi}
                    {...disableRules({ name, index, values })}
                  />
                )}
              </FormFieldsWrapper>
            ))
          }
        </FieldArray>
      );
  };

  const renderAgreementFiled = () => {
    if (activePage === 0 && !values.agreement) {
      const operator = values?.[FIELDS_NAMES.operator.type];

      if (OPERATORS_WITH_AGREEMENT.includes(operator)) {
        return (
          <AgreementField>
            <Link link={AGREEMENT_TEMPLATE} label={LINK_TITLES.agreement} />
            <UploadField
              values={values}
              validate={required}
              snackbarProps={snackbarProps}
              name="agreement"
              title={BUTTON_TITLES.uploadAgreement}
              {...fileProps}
            />
          </AgreementField>
        );
      } else formApi.change("agreement", undefined);
    }
    return;
  };

  const renderOperatorSelectField = () => {
    if (activePage === 0 && activeForm === 1) {
      return <OperatorSelectField />;
    }
  };

  const renderAddButton = type => {
    if (!isFileLoaded(`${type}_list`)) {
      if (activePage === 0 && activeForm === 0) return;

      const disabled = () => {
        if (type === "sender" && values.receiver.length > 1) return true;
        if (type === "receiver" && values.sender.length > 1) return true;
      };

      return (
        <AddButton
          disabled={disabled(type)}
          type={type}
          errors={errors}
          push={push}
          {...snackbarProps}
        />
      );
    }
  };

  const renderFilesButtons = type => {
    let files = {};
    for (let key in fileProps.files) {
      if (key === type) files[key] = fileProps.files[key];
      if (key === "agreement") files[key] = fileProps.files[key];
    }
    return (
      Object.values(files).some(file => file !== null) &&
      Object.entries(files).map(([key, value]) => {
        if (value) {
          return (
            <SelectedFileChip
              key={key}
              name={key}
              label={value}
              formApi={formApi}
              setResponse={setResponse}
              setValidationErrors={setValidationErrors}
              {...fileProps}
            />
          );
        }
        return null;
      })
    );
  };

  const renderRequestIdField = () => {
    if (
      !isFileLoaded("sender_list") &&
      activePage === 1 &&
      OPERATORS_WITH_REQUEST_ID.includes(operatorId)
    )
      return <RequestIdField />;
  };

  const renderFileContent = name => {
    if (isFileLoaded(name))
      return (
        <FileContent key={name} name={name} content={content.data[name]} />
      );
  };

  switch (activeForm) {
    case 0: {
      return (
        <PageWrapper>
          <TypeDataTitle>
            {typeDataTitle}
            {activePage === 1 && (
              <FilesButtons>
                {renderFilesButtons("sender_list")}
                <OpenModalButton
                  key="sender_list"
                  name="sender_list"
                  activePage={activePage}
                  values={values}
                  snackbarProps={snackbarProps}
                  content={content}
                  setContent={setContent}
                  formApi={formApi}
                  {...fileProps}
                />
              </FilesButtons>
            )}
          </TypeDataTitle>
          <Content>
            <WrappedFieldsRows components={[renderRequestIdField()]} />
            {renderSenderFieldArray()}
            {renderFileContent("sender_list")}
            {renderAddButton("sender")}
          </Content>
        </PageWrapper>
      );
    }
    case 1:
      return (
        <PageWrapper>
          <TypeDataTitle>
            {typeDataTitle}
            <FilesButtons>
              {renderFilesButtons("receiver_list")}
              <OpenModalButton
                key="receiver_list"
                name="receiver_list"
                activePage={activePage}
                values={values}
                snackbarProps={snackbarProps}
                content={content}
                setContent={setContent}
                formApi={formApi}
                {...fileProps}
              />
            </FilesButtons>
          </TypeDataTitle>
          <Content>
            <WrappedFieldsRows components={[renderOperatorSelectField()]} />
            {renderAgreementFiled()}
            {renderReceiverFieldArray()}
            {renderFileContent("receiver_list")}
            {renderAddButton("receiver")}
          </Content>
        </PageWrapper>
      );
    case 2:
      return (
        <>
          <TypeDataTitle>{typeDataTitle}</TypeDataTitle>
          <InputValidationForm
            key={3}
            values={values}
            buttonProps={activeFormProps}
            fileProps={fileProps}
            response={response}
            setResponse={setResponse}
            setValidationErrors={setValidationErrors}
            snackbarProps={snackbarProps}
            formApi={formApi}
            content={content}
            setXlsSaver={setXlsSaver}
            fileSaverSwitcher={fileSaverSwitcher}
            setFileSaverSwitcher={setFileSaverSwitcher}
            {...authProps}
          />
        </>
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

const FilesButtons = styled.div``;
