import React from "react";
import Button from "@material-ui/core/Button";
import ErrorIcon from "@material-ui/icons/Error";

import { VALIDATION_FORM_TITLE } from "constants";

const CheckDataButton = ({ isData, title, setActiveStep, setActiveForm }) => {
  const onClick = () => {
    if (title === VALIDATION_FORM_TITLE.sender) {
      setActiveStep(0);
      setActiveForm(0);
    }
    if (title === VALIDATION_FORM_TITLE.receiver) {
      setActiveStep(1);
      setActiveForm(1);
    }
  };

  return (
    !isData && (
      <Button
        variant="outlined"
        color="primary"
        startIcon={<ErrorIcon />}
        onClick={onClick}
      >
        {title}
      </Button>
    )
  );
};

export default CheckDataButton;
