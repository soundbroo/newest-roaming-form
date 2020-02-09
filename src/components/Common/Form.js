import React, { useState, useContext, useEffect } from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { Form as FinalForm } from "react-final-form";

// import { FormsValuesContext, FormsValuesProvider } from "utils/context";

import useStepChanger from "hooks/useStepChanger";

import Stepper from "components/Common/Stepper";
import GeneratedForm from "components/Forms/GeneratedForm";
import OwnerOrgForm from "components/Forms/ClientsForms/OwnerOrgForm";
import ContragentsForm from "components/Forms/ClientsForms/ContragentsForm";
import ClientForm from "components/Forms/OperatorsForms/ClientForm";
import AOContragentsForm from "components/Forms/OperatorsForms/AOContragentsForm";
import InputValidationForm from "components/Forms/InputValidationForm";
import { FORM_TITLES } from "constants";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const Form = ({ activePage }) => {
  const [activeForm, setActiveForm] = useState(0);
  const [activeStep, setActiveStep] = useStepChanger(0);

  // const [values, setValues] = useContext(FormsValuesContext);

  const activeFormData = Object.values(FORM_TITLES).find(
    form => form.id === activePage
  );
  const mainTitle = activeFormData.mainTitle;
  const typeDataTitle = activeFormData.stepTitles[activeStep];
  const stepTitles = activeFormData.stepTitles;
  const stepFieldsNames = activeFormData.stepFieldsNames;

  const formDefaultProps = {
    activeForm,
    stepFieldsNames
  };

  const activeFormProps = {
    setActiveStep,
    setActiveForm
  };

  const renderActiveForm = values => {
    // setValues(values);

    switch (activePage) {
      case 0:
        switch (activeForm) {
          case 0:
            return (
              <GeneratedForm
                key={activeForm}
                component={OwnerOrgForm}
                {...formDefaultProps}
              />
            );
          case 1:
            return (
              <GeneratedForm
                key={activeForm}
                component={ContragentsForm}
                {...formDefaultProps}
              />
            );
          case 2:
            return (
              <InputValidationForm
                values={values}
                buttonProps={activeFormProps}
              />
            );
        }
      case 1:
        switch (activeForm) {
          case 0:
            return (
              <GeneratedForm
                key={activeForm}
                component={ClientForm}
                {...formDefaultProps}
              />
            );
          case 1:
            return (
              <GeneratedForm
                key={activeForm}
                component={AOContragentsForm}
                {...formDefaultProps}
              />
            );
          case 2:
            return (
              <InputValidationForm
                values={values}
                buttonProps={activeFormProps}
              />
            );
        }
    }
  };

  return (
    <>
      <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => {
          return (
            // <FormsValuesProvider>
            <form onSubmit={handleSubmit}>
              <FormWrapper>
                <MainTitle>{mainTitle}</MainTitle>
                <Stepper
                  steps={stepTitles}
                  activePage={activePage}
                  setActiveForm={setActiveForm}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
                <TypeDataTitle>{typeDataTitle}</TypeDataTitle>
                {renderActiveForm(values)}
              </FormWrapper>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
            // </FormsValuesProvider>
          );
        }}
      />
    </>
  );
};

export default Form;

const FormWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  padding: 15px;
`;

const MainTitle = styled.div``;
const TypeDataTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;
