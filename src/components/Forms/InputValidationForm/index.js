import React from "react";

import NoDataPanel from "components/Forms/InputValidationForm/NoDataPanel";
import ValidationPanel from "components/Forms/InputValidationForm/ValidationPanel";
import CheckDataButton from "components/Forms/InputValidationForm/CheckDataButton";

import { VALIDATION_FORM_TITLE } from "constants";

const InputValidationForm = ({ values, buttonProps }) => {
  const isSender = Boolean(values?.sender[0]);
  const isReceiver = Boolean(values?.receiver[0]);

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

  const renderSuccess = agent => (
    <>
      <span>{VALIDATION_FORM_TITLE[agent]}</span>
      {values[agent].map(agent => (
        <ValidationPanel agent={agent} />
      ))}
    </>
  );

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
