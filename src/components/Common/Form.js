import React, { useState, useContext, useEffect } from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { Form as FinalForm } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";

import ClientsPage from "pages/ClientsPage";
import OperatorsPage from "pages/OperatorsPage";

import useStepChanger from "hooks/useStepChanger";

import Stepper from "components/Common/Stepper";
import GeneratedForm from "components/Forms/GeneratedForm";

import { FORM_TITLES } from "constants";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const Form = ({ activePage }) => {
  const [activeForm, setActiveForm] = useState(0);
  const [activeStep, setActiveStep] = useStepChanger(0);

  useEffect(() => {
    setActiveForm(0);
  }, [activePage]);

  const activeFormData = Object.values(FORM_TITLES).find(
    form => form.id === activePage
  );
  const mainTitle = activeFormData.mainTitle;
  const typeDataTitle = activeFormData.stepTitles[activeStep];
  const stepTitles = activeFormData.stepTitles;
  const stepFieldsNames = activeFormData.stepFieldsNames;

  const pageProps = {
    activeForm,
    activeFormProps: {
      setActiveStep,
      setActiveForm
    }
  };

  const renderActiveForm = ({ values, form, handleSubmit, push, pop }) => {
    const formProps = { push, pop };

    switch (activePage) {
      case 0:
        return (
          <form onSubmit={handleSubmit}>
            <ClientsPage {...pageProps} {...formProps} values={values} />
          </form>
        );
      case 1:
        return (
          <form onSubmit={handleSubmit}>
            <OperatorsPage {...pageProps} {...formProps} values={values} />
          </form>
        );
      // case 2: ...
    }
  };

  return (
    <>
      <FinalForm
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        render={({
          form: {
            mutators: { push, pop },
            reset
          },
          handleSubmit,
          form,
          submitting,
          pristine,
          values
        }) => {
          useEffect(() => {
            reset();
          }, [activePage]);

          return (
            <>
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
                {renderActiveForm({
                  values,
                  form,
                  handleSubmit,
                  reset,
                  push,
                  pop
                })}
              </FormWrapper>
              <b
                style={{
                  position: "fixed",
                  right: 200,
                  right: 10,
                  fontSize: 14
                }}
              >
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </b>
            </>
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

  form {
    width: 100%;
  }
`;

const MainTitle = styled.div``;
const TypeDataTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;
