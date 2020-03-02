import React, { useEffect } from "react";
import styled from "styled-components";

import { Content } from "components/Common/styled";
import Auth from "components/Common/Auth";
import NoDataPanel from "components/Forms/InputValidationForm/NoDataPanel";
import ValidationPanel from "components/Forms/InputValidationForm/ValidationPanel";
import CheckDataButton from "components/Forms/InputValidationForm/CheckDataButton";

import useModal from "hooks/useModal";

import { VALIDATION_FORM_TITLE, statuses } from "constants";

const InputValidationForm = ({
  values,
  buttonProps,
  response,
  setResponse,
  files: { sender_list, receiver_list },
  messageState,
  openState,
  colorState,
  auth,
  setAuth
}) => {
  const { setMessage } = messageState;
  const { setOpen } = openState;
  const { setColor } = colorState;

  const isSender = Boolean(values?.sender[0]) || sender_list;
  const isReceiver = Boolean(values?.receiver[0] || receiver_list);
  const notification = response?.data?.text;

  const setSnackbar = (message, boolean, color) => {
    setMessage(message);
    setOpen(boolean);
    setColor(color);
  };

  const [Modal, isModal, setIsModal] = useModal({
    component: Auth,
    auth,
    setAuth,
    messageState,
    openState,
    colorState,
    refresh: auth.refresh
  });

  useEffect(() => {
    if (notification) {
      setSnackbar(notification, true, statuses.success);
      setResponse(null);
    }
  }, [response]);

  useEffect(() => {
    if (auth.refresh === true) setIsModal(!isModal);
  }, [auth.refresh]);

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

    const dataMap = agent => {
      if (!response) {
        return values[agent];
      } else if (notification === "Список получателей пуст") {
        setMessage(notification);
        setOpen(true);
        return values[agent];
      }
      return response?.data?.[agent];
    };

    const data = dataMap(agent);

    const renderAuthModal = () => {
      if (auth.refresh && isModal) {
        return <Modal />;
      }
      return null;
    };

    return (
      <>
        {renderAuthModal()}
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
