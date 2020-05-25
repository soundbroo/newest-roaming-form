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

const Form = ({
  activePage,
  setActivePage,
  snackbarProps,
  response,
  setResponse,
  requestStatus,
  setRequestStatus,
  auth,
  setAuth,
  isFormValue,
  setIsFormValue,
  ticket,
  setTicket,
  showTicketField,
}) => {
  useEffect(() => {
    if (
      document.cookie
        .split(" ")
        .find((cookie) => cookie.includes("sessionToken"))
    )
      setAuth({ ...auth, status: true });
    if (auth.sessionToken) {
      document.cookie = auth.sessionToken;
    }
  }, [auth.sessionToken]);

  const axios = new AxiosService();

  const defaultFilesToReload = {
    sender_list: null,
    receiver_list: null,
  };
  const [filesToReload, setFilesToReload] = useState(defaultFilesToReload);
  const [fileSaverSwitcher, setFileSaverSwitcher] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const submit = (values) => {
    switch (activePage) {
      case 0:
        return axios.abonent({
          values,
          activePage,
          setRequestStatus,
          setResponse,
          filesToReload,
        });
      case 1:
        return axios.operator({
          values,
          activePage,
          setActivePage,
          setResponse,
          setRequestStatus,
          filesToReload,
          auth,
          setAuth,
        });
    }
  };

  const [activeForm, setActiveForm] = useState(0);
  const [activeStep, setActiveStep] = useStepChanger(0);

  const defaultFiles = {
    sender_list: null,
    receiver_list: null,
    agreement: null,
  };
  const [files, setFiles] = useState(defaultFiles);
  const [formApi, setFormApi] = useState({});

  const bindFormApi = (formApi) => {
    setFormApi(formApi);
    const unsubscribe = () => {};
    return unsubscribe;
  };

  const setNewPage = () => {
    setActiveForm(0);
    setFiles(defaultFiles);
    setResponse(null);
    setFilesToReload(defaultFilesToReload);
    setValidationErrors({});
    setFileSaverSwitcher(false);
  };

  useEffect(() => {
    setNewPage();
  }, [activePage]);

  useEffect(() => {
    setValidationErrors({});
    setFileSaverSwitcher(false);
  }, [activeForm]);

  const activeFormData = Object.values(FORM_TITLES).find(
    (form) => form.id === activePage
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
      setActiveForm,
    },
    authProps: {
      auth,
      setAuth,
    },
    fileProps: {
      files,
      setFiles,
      filesToReload,
      setFilesToReload,
    },
    response,
    setResponse,
    setValidationErrors,
    fileSaverSwitcher,
    setFileSaverSwitcher,
    operatorId: auth.operatorId,
  };

  const emptyFormValues = {
    sender: [null],
    receiver: [null],
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
        validate={(values) => {
          const errors = {};
          if (values.receiver_list !== null || values.sender_list !== null)
            return errors;
        }}
        mutators={{ ...arrayMutators }}
        render={({
          form: {
            mutators: { push, remove },
            reset,
          },
          handleSubmit,
          form,
          submitting,
          values,
          errors,
        }) => {
          const isValue = () => {
            if (!localStorage.getItem("showNavigationDialog")) {
              const check = (type) => {
                return (
                  values[type][0] !== null &&
                  Object.values(values[type][0]).some((el) => el !== "")
                );
              };
              return check("sender") || check("receiver");
            }
          };

          useEffect(() => {
            reset();
            setIsFormValue(false);
          }, [activePage]);

          useEffect(() => {
            isValue() && !isFormValue && setIsFormValue(true);
          }, [values]);

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
                  values={values}
                  errors={errors}
                  validationErrors={validationErrors}
                  submit={submit}
                  handleSubmit={handleSubmit}
                  emptyFormValues={emptyFormValues}
                  mainTitle={mainTitle}
                  filesToReload={filesToReload}
                  submitting={submitting}
                  response={response}
                  setResponse={setResponse}
                  setNewPage={setNewPage}
                  formApi={formApi}
                  {...snackbarProps}
                >
                  <form onSubmit={handleSubmit}>
                    <Page
                      {...pageProps}
                      formApi={formApi}
                      push={push}
                      remove={remove}
                      values={values}
                      errors={errors}
                      submitting={submitting}
                      setNewPage={setNewPage}
                      ticket={ticket}
                      setTicket={setTicket}
                      showTicketField={showTicketField}
                    />
                  </form>
                </Stepper>
              </FormWrapper>
              {/* <b
                style={{
                  position: "fixed",
                  top: 200,
                  right: 10,
                  fontSize: 14,
                }}
              >
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </b> */}
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
  padding: 15px;

  @media (min-width: 660px) {
    height: calc(100vh - 126px);
    width: 600px;
  }

  @media (max-width: 660px) {
    height: calc(100vh - 90px);
  }

  form {
    width: 100%;
  }
`;
