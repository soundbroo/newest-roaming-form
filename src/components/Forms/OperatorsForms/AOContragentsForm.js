import React from "react";
import { Field } from "react-final-form";

import TemplateOperatorsForm from "components/Forms/OperatorsForms/TemplateOperatorsForm";

// Шаблон для страницы Операторам - Данные контрагентов

const AOContragentsForm = ({ activeForm, stepFieldsNames, values }) => (
  <TemplateOperatorsForm
    activeForm={activeForm}
    stepFieldsNames={stepFieldsNames}
    values={values}
  />
);

export default AOContragentsForm;
