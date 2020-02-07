import React from "react";
import { Field } from "react-final-form";
import { Button } from "@material-ui/core";

import TemplateOperatorsForm from "components/Forms/OperatorsForms/TemplateOperatorsForm";
import useFormGenerator from "hooks/useFormGenerator";
// Шаблон для страницы Операторам - Данные контрагентов

const Component = (activeForm, stepFieldsNames, values) => (
  <TemplateOperatorsForm
    activeForm={activeForm}
    stepFieldsNames={stepFieldsNames}
    values={values}
  />
);

const AOContragentsForm = ({ activeForm, stepFieldsNames, values }) => {
  const [formsArray, addForm] = useFormGenerator(
    Component,
    activeForm,
    stepFieldsNames,
    values
  );

  return (
    <>
      {formsArray.map(form => form)}
      <Button variant="contained" color="primary" onClick={addForm}>
        Добавить клиента
      </Button>
    </>
  );
};

export default AOContragentsForm;
