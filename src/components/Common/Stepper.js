import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import IconError from "@material-ui/icons/Error";

import { statuses } from "constants";

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
  showSnackbar,
  children
}) => {
  const defaultCompleteState = { 0: false, 1: false, 2: false };
  const [completed, setCompleted] = useState(defaultCompleteState);
  const defaultStepErrors = { 0: null, 1: null, 2: false };
  const [stepErrors, setStepErrors] = useState(defaultStepErrors);
  const isErrors = Object.keys(errors).length;
  const showErrorSnackbar = () =>
    showSnackbar(
      "Заполните недостающие поля и исправьте ошибки",
      statuses.error,
      true,
      4000
    );

  const restartForm = () => {
    setNewPage();
    setInitialValues(emptyFormValues);
    setActiveStep(0);
    setCompleted(defaultCompleteState);
    setStepErrors(defaultStepErrors);
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
        response && setResponse(null);
        if (!isErrors) {
          setStepErrors({ ...stepErrors, 0: false });
        } else setStepErrors({ ...stepErrors, 0: true });
        break;
      case 1:
        response && setResponse(null);
        if (stepErrors[0] !== false || isErrors || stepErrors[1] !== false) {
          return showErrorSnackbar();
        }
        break;
      case 2:
        if (validationErrors?.length > 0 || isErrors > 0) {
          return showErrorSnackbar();
        }
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
    if (activeStep === 1 && !isErrors) {
      setStepErrors({ ...stepErrors, 1: false });
    }
    if (activeStep === 1 && isErrors) {
      setStepErrors({ ...stepErrors, 1: true });
    }
    if (activeStep === 2 && isErrors) {
      setStepErrors({ ...stepErrors, 2: false });
    }
    setStepperState(prevActiveStep => prevActiveStep - 1);
  };

  useEffect(() => {
    if (!isErrors) return setStepErrors({ ...stepErrors, [activeStep]: false });
    return setStepErrors({ ...stepErrors, [activeStep]: true });
  }, [errors]);

  const showErrors = index => {
    switch (activeStep) {
      case 0:
      case 1:
        return stepErrors?.[index];
    }
  };

  return (
    <>
      <ContentWrapper>
        <MainTitle>{mainTitle}</MainTitle>
        <StepperPanel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <Label
                key={label}
                error={showErrors(index)}
                completed={completed[index]}
                StepIconProps={
                  showErrors(index) && {
                    icon: <ErrorIcon />
                  }
                }
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
            disabled={submitting}
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

const ErrorIcon = styled(IconError)`
  font-size: 29px !important;
  color: ${p => p.theme.palette.error};
`;

const BackButton = styled.div`
  display: ${p => p.activeStep === 0 && "none"};
`;

const RestartButton = styled.div`
  display: ${p => p.activeStep !== 2 && "none"};
  @media (max-width: 660px) {
    button {
      font-size: 0;
      padding: 0;
      height: 34px;
      min-width: 34px;
      span:first-child {
        width: 20px;
        span {
          margin: 0;
        }
      }
    }
  }
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
