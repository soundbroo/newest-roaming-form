import React, { useState } from "react";

const useStepChanger = () => {
  const [activeStep, setActiveStep] = useState(0);

  return [activeStep, setActiveStep];
};

export default useStepChanger;
