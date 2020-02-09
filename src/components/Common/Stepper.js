import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function HorizontalNonLinearStepper({
  steps,
  activePage,
  setActiveForm,
  activeStep,
  setActiveStep
}) {
  // const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  useEffect(() => {
    setActiveStep(0);
    setCompleted({});
  }, [steps, activePage]);

  const isLastStep = () => {
    return activeStep === steps.length - 1;
  };

  const allStepsCompleted = () => {
    return Object.keys(completed).length === steps.length;
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleNext = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => () => {
    setActiveStep(step);
    setActiveForm(step);
  };

  return (
    <>
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
      {/* <Button
        disabled={activeStep === 0}
        onClick={handleBack}
      >
        Назад
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
      >
        Далее
      </Button> */}
    </>
  );
}
