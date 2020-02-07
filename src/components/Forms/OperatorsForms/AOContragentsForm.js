import React from "react";
import { Field } from "react-final-form";
import { Button } from "@material-ui/core";

import TemplateOperatorsForm from "components/Forms/OperatorsForms/TemplateOperatorsForm";
import useFormGenerator from "hooks/useFormGenerator";
import GeneratedForm from "components/Forms/GeneratedForm";
// Шаблон для страницы Операторам - Данные контрагентов

const AOContragentsForm = ({ activeForm, stepFieldsNames, values }) => {
  const component = ({ activeForm, stepFieldsNames, values }) => (
    <TemplateOperatorsForm
      activeForm={activeForm}
      stepFieldsNames={stepFieldsNames}
      values={values}
    />
  );
  return (
    <GeneratedForm
      component={component}
      activeForm={activeForm}
      stepFieldsNames={stepFieldsNames}
      values={values}
    />
  );
};

export default AOContragentsForm;
