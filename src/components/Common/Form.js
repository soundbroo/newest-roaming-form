import React, { useState, useContext, useEffect } from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { Form as FinalForm } from "react-final-form";
import arrayMutators from "final-form-arrays";

import Page from "pages/Page";

import useStepChanger from "hooks/useStepChanger";
import Auth from "components/Common/Auth";
import Stepper from "components/Common/Stepper";

import { FORM_TITLES } from "constants";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const Form = ({ activePage }) => {
  const [activeForm, setActiveForm] = useState(0);
  const [activeStep, setActiveStep] = useStepChanger(0);
  const [isAuth, setAuth] = useState(true);

  console.log("Cookies: ", document.cookie);

  useEffect(() => {
    setActiveForm(0);
  }, [activePage]);

  const activeFormData = Object.values(FORM_TITLES).find(
    form => form.id === activePage
  );
  const mainTitle = activeFormData.mainTitle;
  const typeDataTitle = activeFormData.stepTitles[activeStep];
  const stepTitles = activeFormData.stepTitles;

  const pageProps = {
    typeDataTitle,
    activePage,
    activeForm,
    activeFormProps: {
      setActiveStep,
      setActiveForm
    }
  };

  const emptyFormValues = {
    sender: [null],
    receiver: [null]
  };

  const [initialValues, setInitialValues] = useState(emptyFormValues);

  if (activePage === 1 && isAuth === false)
    return <Auth isAuth={isAuth} setAuth={setAuth} />;

  return (
    <>
      <FinalForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        render={({
          form: {
            mutators: { push },
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
                <Stepper
                  steps={stepTitles}
                  activePage={activePage}
                  setActiveForm={setActiveForm}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  setInitialValues={setInitialValues}
                  values={values}
                  emptyFormValues={emptyFormValues}
                  mainTitle={mainTitle}
                >
                  <form onSubmit={handleSubmit}>
                    <Page {...pageProps} push={push} values={values} />
                  </form>
                </Stepper>
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  min-height: 560px;
  padding: 15px;

  form {
    width: 100%;
  }
`;
