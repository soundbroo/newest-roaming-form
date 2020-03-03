import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper
} from "@material-ui/core";

const getStepContent = (step, text) => {
  switch (step) {
    case 0:
      return "Заявка отправлена";
    case 1:
      return text;
    case 2:
      return text;
    default:
      return "";
  }
};

const RequestStatus = ({ status, response }) => {
  const [activeStep, setActiveStep] = useState(0);
  const text = status || response;

  useEffect(() => {
    if (text) {
      if (
        text === "Заявка принята оператором контрагента и находится в обработке"
      )
        return setActiveStep(1);
      return setActiveStep(2);
    }
  }, [status, response]);

  const steps = ["Отправка", "Обработка", "Результат"];

  return (
    <Wrapper>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <Label>{label}</Label>
            <Content>
              <div>{getStepContent(index, text)}</div>
            </Content>
          </Step>
        ))}
      </Stepper>
    </Wrapper>
  );
};

export default RequestStatus;

const Label = styled(StepLabel)`
  width: 120px !important;
`;

const Content = styled(StepContent)`
  padding-left: 28px !important;
`;

const Wrapper = styled(Paper)`
  width: 1000px;
  margin-bottom: 40px;
`;
