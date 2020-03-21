import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Stepper,
  Step,
  StepLabel,
  StepButton,
  Button,
  CircularProgress
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

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
  response,
  setResponse,
  setNewPage,
  formApi,
  children
}) => {
  const defaultCompleteState = { 0: false, 1: false, 2: false };
  const [completed, setCompleted] = useState(defaultCompleteState);

  const restartForm = () => {
    setNewPage();
    setInitialValues(emptyFormValues);
    setActiveStep(0);
    setCompleted(defaultCompleteState);
  };

  useEffect(() => {
    setInitialValues(emptyFormValues);
  }, [activePage]);

  useEffect(() => {
    setActiveStep(0);
    setCompleted(defaultCompleteState);
  }, [steps, activePage]);

  const setStepperState = step => {
    setActiveStep(step);
    setActiveForm(step);
    setInitialValues(values);
  };

  const completeStep = () => {
    if (activeStep !== 2) {
      setCompleted({ ...completed, [activeStep]: true });
    }
  };

  const isLastStep = () => {
    return activeStep === steps.length - 1;
  };

  const allStepsCompleted = () => {
    return Object.keys(completed).length === steps.length;
  };

  const handleNext = () => {
    switch (activeStep) {
      case 0:
      case 1:
        response && setResponse(null);
        break;
      case 2:
        return handleSubmit(values);
    }
    completeStep();
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setStepperState(newActiveStep);
  };

  const handleBack = () => {
    setStepperState(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => {
    if (step === 2) {
      if (completed[0] && completed[1]) {
        return setStepperState(step);
      }
      return formApi.resumeValidation();
    }
    if (Object.keys(errors).length) {
      if (completed[step]) {
        setStepperState(step);
      }
      return formApi.resumeValidation();
    }
    setStepperState(step);
    completeStep();
  };

  return (
    <>
      <ContentWrapper>
        <MainTitle>{mainTitle}</MainTitle>
        <StepperPanel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <Label
                // onClick={() => handleStep(index)}
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
        <LeftButtons>
          <BackButton activeStep={activeStep}>
            <Button variant="outlined" color="primary" onClick={handleBack}>
              Назад
            </Button>
          </BackButton>
          <RestartButton activeStep={activeStep}>
            <Button
              variant="outlined"
              color="primary"
              onClick={restartForm}
              startIcon={<RefreshIcon />}
            >
              Новое заявление
            </Button>
          </RestartButton>
        </LeftButtons>
        <RightButtons>
          {submitting && <CircularProgress size={25} />}
          <Button
            disabled={
              submitting ||
              validationErrors?.length > 0 ||
              Object.keys(errors).length > 0
              // || (activeStep === 2 && !(completed[0] && completed[1]))
            }
            variant="contained"
            color="primary"
            type={activeStep === 2 ? "submit" : "button"}
            onClick={handleNext}
          >
            {activeStep === 2 ? "Отправить" : "Далее"}
          </Button>
        </RightButtons>
      </ButtonWrapper>
    </>
  );
};

export default StepperComponent;

const BackButton = styled.div`
  display: ${p => p.activeStep === 0 && "none"};
`;

const RestartButton = styled.div`
  display: ${p => p.activeStep !== 2 && "none"};
`;

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

const RightButtons = styled.div`
  display: flex;
  align-items: center;
  div {
    margin-right: 9px;
  }
`;

const LeftButtons = styled.div`
  display: flex;
  align-items: center;
  button:last-child {
    margin-left: 9px;
    @media (max-width: 440px) {
      display: none;
    }
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
