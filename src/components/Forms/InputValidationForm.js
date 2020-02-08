import React from "react";
import styled from "styled-components";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ErrorIcon from "@material-ui/icons/Error";

import { VALIDATION_FORM_TITLE } from "constants";

const InputValidationForm = ({ values }) => {
  const data = {
    sender: [],
    receiver: []
  };

  const isFullfilled = {
    sender: data.sender.length,
    receiver: data.receiver.length
  };

  for (let key in values) {
    const fieldData = values[key];
    const [_, agent, number, field] = key.split("_");
    data[agent][number] === undefined ? (data[agent][number] = {}) : false;
    console.log(data[agent][number]);
    data[agent][number] = { ...data[agent][number], [field]: fieldData };
    console.log(data);
  }

  const renderError = () => {
    if (Object.keys(values).length === 0)
      return (
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <ExpansionPanelItem>Нет данных для отправки</ExpansionPanelItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ExpansionPanelContent>
              Отстутствуют или недостаточно данных для отправки на сервер.
              Проверьте пожалуйста введенные данные на шагах:
              {!isFullfilled.sender && (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ErrorIcon />}
                >
                  {VALIDATION_FORM_TITLE.sender}
                </Button>
              )}
              {!isFullfilled.receiver && (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ErrorIcon />}
                >
                  {VALIDATION_FORM_TITLE.receiver}
                </Button>
              )}
            </ExpansionPanelContent>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
  };

  const renderForm = agent => (
    <>
      <span>{VALIDATION_FORM_TITLE[agent]}</span>
      {data[agent].map(agent => (
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <ExpansionPanelItem>{agent.inn}</ExpansionPanelItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ExpansionPanelContent>
              {Object.entries(agent).map(([key, value]) => {
                return (
                  <ExpansionPanelItem>
                    <span>{key}:</span> <span>{value}</span>
                  </ExpansionPanelItem>
                );
              })}
            </ExpansionPanelContent>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </>
  );

  return (
    <>
      {!isFullfilled.sender && isFullfilled.receiver && renderError()}
      {isFullfilled.sender && renderForm("sender")}
      {isFullfilled.receiver && renderForm("receiver")}
    </>
  );
};

export default InputValidationForm;

const ExpansionPanelContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ExpansionPanelItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
