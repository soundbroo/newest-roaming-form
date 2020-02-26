import React from "react";
import styled from "styled-components";

import { Content } from "components/Common/styled";
import NoDataPanel from "components/Forms/InputValidationForm/NoDataPanel";
import ValidationPanel from "components/Forms/InputValidationForm/ValidationPanel";
import CheckDataButton from "components/Forms/InputValidationForm/CheckDataButton";

import { VALIDATION_FORM_TITLE } from "constants";

const InputValidationForm = ({
  values,
  buttonProps,
  response,
  files: { sender_list, receiver_list },
  messageState: { setMessage },
  openState: { setOpen }
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
    if (agentFile && !response) return <div>Вы загрузили файл {agentFile}</div>;

    const error = response?.data?.text;
    console.log(error);

    const dataMap = agent => {
      if (!response) {
        console.log("!RES");
        return values[agent];
      } else if (error === "Список получателей пуст") {
        console.log("ERROR");
        setMessage(error);
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
            error={error}
            data={
              error || !response ? data : response?.data?.[agent]?.[index].input
            }
            errors={response?.data?.[agent]?.[index].errors}
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
