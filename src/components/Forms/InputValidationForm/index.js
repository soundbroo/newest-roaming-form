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
  files,
  snackbarProps,
  auth,
  setAuth
}) => {
  const { showSnackbar } = snackbarProps;

  const isSender = Boolean(values?.sender[0]) || files.sender_list;
  const isReceiver = Boolean(values?.receiver[0] || files.receiver_list);
  const notification = response?.data?.text;

  const [Modal, isModal, setIsModal] = useModal({
    component: Auth,
    auth,
    setAuth,
    refresh: auth.refresh,
    snackbarProps
  });

  useEffect(() => {
    if (notification) {
      const snackbarColor =
        response?.data?.status === 0 ? statuses.success : statuses.error;
      showSnackbar(notification, snackbarColor, true, null);
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
          return files.sender_list;
        case "receiver":
          return files.receiver_list;
      }
    };
    const agentFile = checkAgent(agent);
    if (agentFile && !response) return <div>Вы загрузили файл {agentFile}</div>;

    const dataMap = agent => {
      if (!response) {
        return values[agent];
      } else if (notification === "Список получателей пуст") {
        showSnackbar(notification, statuses.error, true, null);
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

    console.log("Bool", files[`${agent}_list`]);

    return (
      <>
        {renderAuthModal()}
        <span>{VALIDATION_FORM_TITLE[agent]}</span>
        {!agentFile
          ? values[agent].map((data, index) => (
              <ValidationPanel
                key={index}
                agentIndex={index}
                agent={agent}
                isFile={agentFile}
                notification={notification}
                data={data}
                responseErrors={response?.data?.[agent]?.[index].errors}
              />
            ))
          : response?.data?.[agent].map((data, index) => (
              <ValidationPanel
                key={index}
                agentIndex={index}
                agent={agent}
                isFile={agentFile}
                notification={notification}
                data={response?.data?.[agent]?.[index].input}
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
