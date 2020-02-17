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

const onSubmit = async submit => {
  return;
};

const Form = ({ activePage }) => {
  const [activeForm, setActiveForm] = useState(0);
  const [activeStep, setActiveStep] = useStepChanger(0);
  const defaultFiles = {
    sender_list: null,
    receiver_list: null
  };
  const [files, setFiles] = useState(defaultFiles);
  const [auth, setAuth] = useState({
    status: !false,
    operatorId: null
  });

  console.log("Cookies: ", document.cookie);

  useEffect(() => {
    setActiveForm(0);
    setFiles(defaultFiles);
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
    },
    fileProps: {
      files,
      setFiles
    },
    operatorId: auth.operatorId
  };

  const emptyFormValues = {
    sender: [null],
    receiver: [null],
    sender_list_name: null,
    receiver_list_name: null
  };

  const [initialValues, setInitialValues] = useState(emptyFormValues);

  if (activePage === 1 && auth.status === false)
    return <Auth auth={auth} setAuth={setAuth} />;

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
  min-height: 640px;
  padding: 15px;

  form {
    width: 100%;
  }
`;
