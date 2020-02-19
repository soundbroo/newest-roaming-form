import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { Form as FinalForm } from "react-final-form";
import arrayMutators from "final-form-arrays";

import Page from "pages/Page";

import useStepChanger from "hooks/useStepChanger";
import Auth from "components/Common/Auth";
import Stepper from "components/Common/Stepper";

import { FORM_TITLES } from "constants";

import AxiosService from "api";

const Form = ({ activePage }) => {
  const axios = new AxiosService();
  const submit = values => {
    switch (activePage) {
      case 0:
        return axios.abonent(values);
      case 1:
        return axios.operator(values);
    }
  };

  const [activeForm, setActiveForm] = useState(0);
  const [activeStep, setActiveStep] = useStepChanger(0);
  const defaultFiles = {
    sender_list: null,
    receiver_list: null
  };
  const [files, setFiles] = useState(defaultFiles);
  const [auth, setAuth] = useState({
    status: false,
    operatorId: null
  });

  const [formApi, setFormApi] = useState({});

  const bindFormApi = formApi => {
    setFormApi(formApi);
    const unsubscribe = () => {};
    return unsubscribe;
  };

  // console.log("Cookies: ", document.cookie);

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
    receiver: [null]
  };

  const [initialValues, setInitialValues] = useState(emptyFormValues);

  if (activePage === 1 && auth.status === false)
    return <Auth auth={auth} setAuth={setAuth} />;

  return (
    <>
      <FinalForm
        initialValues={initialValues}
        onSubmit={submit}
        decorators={[bindFormApi]}
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
          values,
          errors
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
                  activeForm={activeForm}
                  setActiveForm={setActiveForm}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  setInitialValues={setInitialValues}
                  values={values}
                  errors={errors}
                  submit={submit}
                  emptyFormValues={emptyFormValues}
                  mainTitle={mainTitle}
                >
                  <form onSubmit={handleSubmit}>
                    <Page
                      {...pageProps}
                      formApi={formApi}
                      push={push}
                      values={values}
                    />
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
