import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress
} from "@material-ui/core";
import StepButton from "@material-ui/core/StepButton";

const StepperComponent = ({
  steps,
  activePage,
  setActiveForm,
  activeStep,
  setActiveStep,
  setInitialValues,
  values,
  errors,
  validationErrors,
  handleSubmit,
  emptyFormValues,
  mainTitle,
  submitting,
  children
}) => {
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    setInitialValues(emptyFormValues);
  }, [activePage]);

  useEffect(() => {
    setActiveStep(0);
    setCompleted({});
  }, [steps, activePage]);

  const setStepperState = step => {
    setActiveStep(step);
    setActiveForm(step);
    setInitialValues(values);
  };

  const isLastStep = () => {
    return activeStep === steps.length - 1;
  };

  const allStepsCompleted = () => {
    return Object.keys(completed).length === steps.length;
  };

  const handleNext = () => {
    if (activeStep === 2) {
      return handleSubmit(values);
    }
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setStepperState(newActiveStep);
  };

  const handleBack = () => {
    setStepperState(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <>
      <ContentWrapper>
        <MainTitle>{mainTitle}</MainTitle>
        <StepperPanel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <Label
                // onClick={handleStep(index)}
                completed={completed[index]}
              >
                {label}
              </Label>
            </Step>
          ))}
        </StepperPanel>
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
        <SubmitButton>
          {submitting && <CircularProgress size={25} />}
          <Button
            disabled={
              validationErrors?.length > 0 || Object.keys(errors).length > 0
            }
            variant="contained"
            color="primary"
            type={activeStep === 2 ? "submit" : "button"}
            onClick={handleNext}
          >
            {activeStep === 2 ? "Отправить" : "Далее"}
          </Button>
        </SubmitButton>
      </ButtonWrapper>
    </>
  );
};

export default StepperComponent;

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

  @media (max-width: 660px) {
    padding: 12px 0 0 0;
  }
`;

const SubmitButton = styled.div`
  display: flex;
  align-items: center;
  div {
    margin-right: 9px;
  }
`;

const MainTitle = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 12px;
`;

const Label = styled(StepLabel)`
  @media (max-width: 660px) {
    flex-direction: column;
    &:last-child {
      span {
        font-size: 0;
      }
    }
    svg {
      font-size: 32px;
    }
  }
`;

const StepperPanel = styled(Stepper)`
  @media (max-width: 660px) {
    padding: 9px 12px;
    width: 100%;
  }
`;
