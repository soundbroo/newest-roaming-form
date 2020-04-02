import React, { useState, useEffect } from "react";
import { Form } from "react-final-form";
import styled from "styled-components";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button
} from "@material-ui/core";

import InputField from "components/Fields/InputField";
import IdentifierField from "components/Fields/IdentifierField";
import { Wrapper, CheckFormContent } from "components/Common/styled";

import { parse } from "utils/parse";

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

const RequestStatus = ({ status, response, input, setInput }) => {
  const [activeStep, setActiveStep] = useState(-1);
  const text = response || status;

  const checkErrors = text => {
    const { request_number } = input.status;
    switch (text) {
      case `Заявка №${request_number} не найдена`:
      case `Не удалось получить информацию по заявке №${request_number}`:
      case "Номер заявки не является целым числом":
        return text;
      default:
        return false;
    }
  };

  const error = input ? checkErrors(text) : false;

  useEffect(() => {
    if (text) {
      if (
        text === "Заявка принята оператором контрагента и находится в обработке"
      ) {
        return setActiveStep(1);
      }
      if (error) {
        return setActiveStep(-1);
      }
      return setActiveStep(2);
    }
  }, [status, response]);

  const steps = ["Отправка", "Обработка", "Завершение"];

  return (
    <>
      <Wrapper>
        <Form
          initialValues={{}}
          onSubmit={setInput}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Title>Проверьте статус Вашего заявления</Title>
                <CheckFormContent>
                  <div>
                    <IdentifierField
                      size="small"
                      variant="outlined"
                      name="status"
                      parse={parse.id}
                    />
                  </div>
                  <div>
                    <InputField
                      size="small"
                      variant="outlined"
                      name="status"
                      fieldType="request_number"
                    />
                  </div>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                  >
                    Проверить
                  </Button>
                </CheckFormContent>
              </form>
            );
          }}
        />
        {activeStep === -1 && input && <Error>{error}</Error>}
        <StepperContainer>
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
        </StepperContainer>
      </Wrapper>
    </>
  );
};

export default RequestStatus;

const Label = styled(StepLabel)`
  width: 120px !important;
`;

const Error = styled.div`
  padding: 12px 0 0 12px;
  font-size: 18px;
  color: ${p => p.theme.palette.error};
`;

const Content = styled(StepContent)`
  padding-left: 28px !important;
`;

const StepperContainer = styled.div`
  @media (max-width: 425px) {
    padding-left: 6px;
  }
`;

const Title = styled.div`
  font-size: 22px;
  margin-bottom: 18px;
  width: 100%;
  text-align: center;
`;
