import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { Form, FormSpy } from "react-final-form";
import arrayMutators from "final-form-arrays";

import RenderCounter from "utils/renderCounter";

import Page from "pages/Page";

import useStepChanger from "hooks/useStepChanger";
import Auth from "components/Common/Auth";
import Stepper from "components/Common/Stepper";

import { FORM_TITLES } from "constants";

import { redirectToStatusCheck } from "utils/redirect";

import AxiosService from "api";

const FormComponent = ({
  activePage,
  setActivePage,
  snackbarProps,
  response,
  setResponse,
  requestStatus,
  setRequestStatus
}) => {
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

  useEffect(() => {
    requestStatus && redirectToStatusCheck(requestStatus, setActivePage);
  }, [requestStatus]);

  const axios = new AxiosService();

  const defaultFilesToReload = {
    sender_list: null,
    receiver_list: null
  };
  const [filesToReload, setFilesToReload] = useState(defaultFilesToReload);
  const [fileSaverSwitcher, setFileSaverSwitcher] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const submit = values => {
    switch (activePage) {
      case 0: {
        {
          return axios.abonent({
            values,
            activePage,
            setRequestStatus,
            setResponse,
            filesToReload
          });
        }
      }
      case 1:
        return axios.operator({
          values,
          activePage,
          setActivePage,
          setResponse,
          setRequestStatus,
          filesToReload,
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
    setFilesToReload(defaultFilesToReload);
    setValidationErrors({});
    setFileSaverSwitcher(false);
  }, [activePage]);

  useEffect(() => {
    setValidationErrors({});
    setFileSaverSwitcher(false);
  }, [activeForm]);

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
      setFiles,
      filesToReload,
      setFilesToReload
    },
    response,
    setResponse,
    setValidationErrors,
    fileSaverSwitcher,
    setFileSaverSwitcher,
    operatorId: auth.operatorId
  };

  const emptyFormValues = {
    sender: [null],
    receiver: [null]
  };

  const [initialValues, setInitialValues] = useState(emptyFormValues);

  // const emptyFormState = {
  //   values: emptyFormValues,
  //   errors: {}
  // };

  const [formValues, setFormValues] = useState(emptyFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [test, setTest] = useState();
  if (activePage === 1 && auth.status === false)
    return <Auth auth={auth} setAuth={setAuth} {...snackbarProps} />;

  return (
    <>
      <Form
        initialValues={initialValues}
        onSubmit={submit}
        subscription={{
          submitting: true
        }}
        decorators={[bindFormApi]}
        validate={values => {
          const errors = {};
          if (values.receiver_list !== null || values.sender_list !== null)
            return errors;
        }}
        mutators={{ ...arrayMutators }}
        render={({
          form: {
            mutators: { push, remove },
            reset
          },
          handleSubmit,
          form,
          submitting,
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
                  response={response}
                  values={formValues}
                  errors={formErrors}
                  validationErrors={validationErrors}
                  submit={submit}
                  handleSubmit={handleSubmit}
                  emptyFormValues={emptyFormValues}
                  mainTitle={mainTitle}
                  filesToReload={filesToReload}
                  submitting={submitting}
                >
                  <form onSubmit={handleSubmit}>
                    <Page
                      {...pageProps}
                      formApi={formApi}
                      push={push}
                      remove={remove}
                      values={formValues}
                      errors={formErrors}
                      submitting={submitting}
                    />
                  </form>
                </Stepper>
              </FormWrapper>

              <b
                style={{
                  position: "fixed",
                  top: 200,
                  left: 10,
                  fontSize: 14
                }}
              >
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </b>

              <b
                style={{
                  position: "fixed",
                  top: 200,
                  right: 10,
                  fontSize: 14
                }}
              >
                <FormSpy subscription={{ values: true, errors: true }}>
                  {({ values, errors }) => {
                    console.log(values);
                    // setTest({});
                    setFormValues(values);
                    return (
                      <>
                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                        <RenderCounter />
                      </>
                    );
                  }}
                </FormSpy>
              </b>
            </>
          );
        }}
      />
    </>
  );
};

export default FormComponent;

const FormWrapper = styled(Paper)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 15px;

  @media (min-width: 660px) {
    min-height: 740px;
    width: 600px;
  }

  @media (max-width: 660px) {
    min-height: calc(100vh - 90px);
  }

  form {
    width: 100%;
  }
`;
