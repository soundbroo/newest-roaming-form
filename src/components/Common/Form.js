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

const Form = ({ activePage, snackbarProps }) => {
  const [auth, setAuth] = useState({
    status: false,
    refresh: false,
    operatorId: localStorage.getItem("operator"),
    sessionToken: null
  });
  useEffect(() => {
    if (
      document.cookie.split(" ").find(cookie => cookie.includes("sessionToken"))
    )
      setAuth({ ...auth, status: true });
    if (auth.sessionToken) {
      document.cookie = auth.sessionToken;
    }
  }, [auth.sessionToken]);

  const axios = new AxiosService();

  const [response, setResponse] = useState(null);

  const submit = values => {
    switch (activePage) {
      case 0:
        return axios.abonent({ values, activePage, setResponse });
      case 1:
        return axios.operator({
          values,
          activePage,
          setResponse,
          auth,
          setAuth
        });
    }
  };

  const [activeForm, setActiveForm] = useState(0);
  const [activeStep, setActiveStep] = useStepChanger(0);
  const defaultFiles = {
    sender_list: null,
    receiver_list: null,
    agreement: null
  };
  const [files, setFiles] = useState(defaultFiles);
  const [formApi, setFormApi] = useState({});

  const bindFormApi = formApi => {
    setFormApi(formApi);
    const unsubscribe = () => {};
    return unsubscribe;
  };

  useEffect(() => {
    setActiveForm(0);
    setFiles(defaultFiles);
    setResponse(null);
  }, [activePage]);

  const activeFormData = Object.values(FORM_TITLES).find(
    form => form.id === activePage
  );
  const mainTitle = activeFormData.mainTitle;
  const typeDataTitle = activeFormData.stepTitles[activeStep];
  const stepTitles = activeFormData.stepTitles;

  const pageProps = {
    snackbarProps,
    typeDataTitle,
    activePage,
    activeForm,
    activeFormProps: {
      setActiveStep,
      setActiveForm
    },
    authProps: {
      auth,
      setAuth
    },
    fileProps: {
      files,
      setFiles
    },
    response,
    setResponse,
    operatorId: auth.operatorId
  };

  const emptyFormValues = {
    sender: [null],
    receiver: [null]
  };

  const [initialValues, setInitialValues] = useState(emptyFormValues);

  if (activePage === 1 && auth.status === false)
    return <Auth auth={auth} setAuth={setAuth} {...snackbarProps} />;

  return (
    <>
      <FinalForm
        initialValues={initialValues}
        onSubmit={submit}
        decorators={[bindFormApi]}
        validate={values => {
          const errors = {};
          if (values.receiver_list !== null || values.sender_list !== null)
            return errors;
        }}
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
                      errors={errors}
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
  min-height: 740px;
  padding: 15px;

  form {
    width: 100%;
  }
`;
