import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { Form as FinalForm } from "react-final-form";

import Stepper from "components/Common/Stepper";
import ClientForm from "components/Forms/OperatorsForms/ClientForm";
import AOContragentsForm from "components/Forms/OperatorsForms/AOContragentsForm";
import { FORM_TITLES } from "constants";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const Form = ({ activePage }) => {
  const [activeForm, setActiveForm] = useState(0);

  const activeFormData = Object.values(FORM_TITLES).find(
    form => form.id === activePage
  );
  const mainTitle = activeFormData.mainTitle;
  const typeDataTitle = activeFormData.typeDataTitle;
  const stepTitles = activeFormData.stepTitles;
  const stepFieldsNames = activeFormData.stepFieldsNames;

  const renderActiveForm = () => {
    switch (activePage) {
      //   case 0:
      //     switch (activeForm) {
      //       case 0:
      //         return <OwnerOrgForm />;
      //       case 1:
      //         return <ContragentsForm />;
      //       case 2:
      //         return <CheckTypedData />;
      //     }
      case 1:
        switch (activeForm) {
          case 0:
            return (
              <ClientForm
                activeForm={activeForm}
                stepFieldsNames={stepFieldsNames}
              />
            );
          case 1:
            return (
              <AOContragentsForm
                activeForm={activeForm}
                stepFieldsNames={stepFieldsNames}
              />
            );
          //   case 2:
          //     return <CheckTypedData />;
        }
    }
  };

  return (
    <>
      <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <FormWrapper>
              <MainTitle>{mainTitle}</MainTitle>
              <Stepper
                steps={stepTitles}
                activePage={activePage}
                setActiveForm={setActiveForm}
              />
              <TypeDataTitle>{typeDataTitle}</TypeDataTitle>
              {renderActiveForm()}
            </FormWrapper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
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
