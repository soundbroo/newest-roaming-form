import React, { useEffect } from "react";
import styled from "styled-components";

import { Content } from "components/Common/styled";
import NoDataPanel from "components/Forms/InputValidationForm/NoDataPanel";
import ValidationPanel from "components/Forms/InputValidationForm/ValidationPanel";
import CheckDataButton from "components/Forms/InputValidationForm/CheckDataButton";

import { VALIDATION_FORM_TITLE, statuses } from "constants";

const InputValidationForm = ({
  values,
  buttonProps,
  response,
  setResponse,
  files: { sender_list, receiver_list },
  messageState: { setMessage },
  openState: { setOpen },
  colorState: { setColor }
}) => {
  const isSender = Boolean(values?.sender[0]) || sender_list;
  const isReceiver = Boolean(values?.receiver[0] || receiver_list);
  const notification = response?.data?.text;

  const setSnackbar = (message, boolean, color) => {
    setMessage(message);
    setOpen(boolean);
    setColor(color);
  };

  useEffect(() => {
    if (notification) {
      setSnackbar(notification, true, statuses.success);
      setResponse(null);
    }
  }, [response]);

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
    if (agentFile && !response) return <div>Вы загрузили файл {agentFile}</div>;

    console.log(notification);

    const dataMap = agent => {
      if (!response) {
        console.log("!RES");
        return values[agent];
      } else if (notification === "Список получателей пуст") {
        console.log("ERROR");
        setMessage(notification);
        setOpen(true);
        return values[agent];
      }
      console.log("RES");
      return response?.data?.[agent];
    };

    const data = dataMap(agent);

    console.log("DATA", data);

    return (
      <>
        <span>{VALIDATION_FORM_TITLE[agent]}</span>

        {data.map((data, index) => (
          <ValidationPanel
            key={index}
            agent={agent}
            notification={notification}
            data={!response ? data : response?.data?.[agent]?.[index].input}
            responseErrors={response?.data?.[agent]?.[index].errors}
          />
        ))}
      </>
    );
  };

  const renderForm = () => {
    if (!isSender && !isReceiver) return renderError();
    return (
      <ValidationFormWrapper>
        {isSender && renderSuccess("sender")}
        {isReceiver && renderSuccess("receiver")}
      </ValidationFormWrapper>
    );
  };

  return renderForm();
};

export default InputValidationForm;

const ValidationFormWrapper = styled(Content)`
  margin-left: -16px;
`;
