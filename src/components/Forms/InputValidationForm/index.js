import React from "react";
import styled from "styled-components";

import NoDataPanel from "components/Forms/InputValidationForm/NoDataPanel";
import ValidationPanel from "components/Forms/InputValidationForm/ValidationPanel";
import CheckDataButton from "components/Forms/InputValidationForm/CheckDataButton";

import { VALIDATION_FORM_TITLE } from "constants";

const InputValidationForm = ({
  values,
  buttonProps,
  files: { sender_list, receiver_list }
}) => {
  const isSender = Boolean(values?.sender[0]) || sender_list;
  const isReceiver = Boolean(values?.receiver[0] || receiver_list);

  const renderError = () => {
    const {
      noDataToSend,
      noDataDescription,
      sender,
      receiver
    } = VALIDATION_FORM_TITLE;
    return (
      <NoDataPanel title={noDataToSend} description={noDataDescription}>
        <CheckDataButton isData={isSender} title={sender} {...buttonProps} />
        <CheckDataButton
          isData={isReceiver}
          title={receiver}
          {...buttonProps}
        />
      </NoDataPanel>
    );
  };

  const renderSuccess = agent => {
    const checkAgent = agent => {
      switch (agent) {
        case "sender":
          return sender_list;
        case "receiver":
          return receiver_list;
      }
    };
    const agentFile = checkAgent(agent);
    if (agentFile) return <div>Вы загрузили файл {agentFile}</div>;
    return (
      <>
        <span>{VALIDATION_FORM_TITLE[agent]}</span>
        <ValidationFormWrapper>
          {values[agent].map(agent => (
            <ValidationPanel agent={agent} />
          ))}
        </ValidationFormWrapper>
      </>
    );
  };

  const renderForm = () => {
    if (!isSender && !isReceiver) return renderError();
    return (
      <>
        {isSender && renderSuccess("sender")}
        {isReceiver && renderSuccess("receiver")}
      </>
    );
  };

  return renderForm();
};

export default InputValidationForm;

const ValidationFormWrapper = styled.div``;
