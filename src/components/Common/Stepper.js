import React, { useEffect } from "react";
import styled from "styled-components";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";

import AxiosService from "api";

export default function HorizontalNonLinearStepper({
  steps,
  activePage,
  setActiveForm,
  activeStep,
  setActiveStep,
  setInitialValues,
  values,
  emptyFormValues,
  mainTitle,
  children
}) {
  const axios = new AxiosService();

  const [completed, setCompleted] = React.useState({});

  useEffect(() => {
    setActiveStep(0);
    setCompleted({});
  }, [steps, activePage]);

  useEffect(() => {
    setInitialValues(emptyFormValues);
  }, [activePage]);

  const submit = () => {
    switch (activePage) {
      case 0:
        return axios.abonent(values);
      case 1:
        return axios.operator(values);
    }
  };

  const isLastStep = () => {
    return activeStep === steps.length - 1;
  };

  const allStepsCompleted = () => {
    return Object.keys(completed).length === steps.length;
  };

  // const handleComplete = () => {
  //   const newCompleted = completed;
  //   newCompleted[activeStep] = true;
  //   setCompleted(newCompleted);
  //   handleNext();
  // };

  const handleNext = () => {
    if (activeStep === 2) return submit();
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    setActiveForm(newActiveStep);
    setInitialValues(values);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    setActiveForm(prevActiveStep => prevActiveStep - 1);
    setInitialValues(values);
  };

  const handleStep = step => () => {
    setActiveStep(step);
    setActiveForm(step);
    setInitialValues(values);
  };

  return (
    <>
      <ContentWrapper>
        <MainTitle>{mainTitle}</MainTitle>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton
                onClick={handleStep(index)}
                completed={completed[index]}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {children}
      </ContentWrapper>
      <ButtonWrapper>
        <Button
          variant="outlined"
          color="primary"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Назад
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Отправить" : "Далее"}
        </Button>
      </ButtonWrapper>
    </>
  );
}

const ContentWrapper = styled.div`
  top: 0;
  width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 24px 0 6px 0;
`;

const MainTitle = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 12px;
`;
