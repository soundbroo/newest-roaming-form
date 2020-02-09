import React from "react";

import NoDataPanel from "components/Forms/InputValidationForm/NoDataPanel";
import ValidationPanel from "components/Forms/InputValidationForm/ValidationPanel";
import CheckDataButton from "components/Forms/InputValidationForm/CheckDataButton";

import { VALIDATION_FORM_TITLE } from "constants";

const InputValidationForm = ({ values, buttonProps }) => {
  const data = {
    sender: [],
    receiver: [],
    get isSender() {
      return this.sender.length;
    },
    get isReceiver() {
      return this.receiver.length;
    }
  };

  for (let key in values) {
    const fieldData = values[key];
    const [_, agent, number, field] = key.split("_");
    data[agent][number] === undefined ? (data[agent][number] = {}) : false;
    data[agent][number] = { ...data[agent][number], [field]: fieldData };
  }

  const renderError = () => {
    const { isSender, isReceiver } = data;
    const {
      noDataToSend,
      noDataDescription,
      sender,
      receiver
    } = VALIDATION_FORM_TITLE;
    if (Object.keys(values).length === 0)
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
      {data[agent].map(agent => (
        <ValidationPanel agent={agent} />
      ))}
    </>
  );

  const renderForm = () => {
    const { isSender, isReceiver } = data;
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
