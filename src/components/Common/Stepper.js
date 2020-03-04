import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";

export default function HorizontalNonLinearStepper({
  steps,
  activePage,
  setActiveForm,
  activeStep,
  setActiveStep,
  setInitialValues,
  values,
  errors,
  submit,
  emptyFormValues,
  mainTitle,
  children
}) {
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    setActiveStep(0);
    setCompleted({});
  }, [steps, activePage]);

  useEffect(() => {
    setInitialValues(emptyFormValues);
  }, [activePage]);

  const isLastStep = () => {
    return activeStep === steps.length - 1;
  };

  const allStepsCompleted = () => {
    return Object.keys(completed).length === steps.length;
  };

  const handleNext = () => {
    if (activeStep === 2) return submit(values);
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
              <StepLabel
                // onClick={handleStep(index)}
                completed={completed[index]}
              >
                {label}
              </StepLabel>
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
        <Button
          disabled={Object.keys(errors).length > 0}
          variant="contained"
          color="primary"
          type={activeStep === 2 ? "submit" : "button"}
          onClick={handleNext}
        >
          {activeStep === 2 ? "Отправить" : "Далее"}
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
