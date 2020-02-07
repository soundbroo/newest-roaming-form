import React, { Fragment, useState } from "react";
import { Field } from "react-final-form";
import { Button } from "@material-ui/core";

import TextFieldAdapter from "components/Common/TextFieldAdapter";
import TemplateOperatorsForm from "components/Forms/OperatorsForms/TemplateOperatorsForm";

// Шаблон для страницы Операторам - Данные вашего клиента

const Component = ({ activeForm, stepFieldsNames, valuess }) => (
  <>
    <Field
      name="request_id"
      component={TextFieldAdapter}
      label="Идентификатор заявки в системе роумингового оператора"
    />
    <TemplateOperatorsForm
      activeForm={activeForm}
      stepFieldsNames={stepFieldsNames(index)}
      values={values}
    />
  </>
);

const ClientForm = ({ activeForm, stepFieldsNames, values }) => {
  const [numberOfForms, setNumberOfForms] = useState(0);

  const renderForm = index => {
    return (
      <Fragment key={index}>
        <Field
          name="request_id"
          component={TextFieldAdapter}
          label="Идентификатор заявки в системе роумингового оператора"
        />
        <TemplateOperatorsForm
          activeForm={activeForm}
          stepFieldsNames={stepFieldsNames(index)}
          values={values}
        />
      </Fragment>
    );
  };

  const [formsArray, setFormsArray] = useState([renderForm(numberOfForms)]);

  const addForm = () => {
    if (numberOfForms <= 5) {
      const index = numberOfForms + 1;
      setNumberOfForms(index);
      setFormsArray([...formsArray, renderForm(index)]);
    }

    console.log(numberOfForms);
  };

  return (
    <>
      {formsArray.map(form => form)}
      <Button variant="contained" color="primary" onClick={addForm}>
        Добавить клиента
      </Button>
    </>
  );
};
export default ClientForm;
