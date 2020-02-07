import React, { Fragment, useState } from "react";
import { Field } from "react-final-form";
import { Button } from "@material-ui/core";

import TextFieldAdapter from "components/Common/TextFieldAdapter";
import TemplateOperatorsForm from "components/Forms/OperatorsForms/TemplateOperatorsForm";

// Шаблон для страницы Операторам - Данные вашего клиента

const useFormGenerator = (Component, activeForm, stepFieldsNames, values) => {
  const [numberOfForms, setNumberOfForms] = useState(0);

  const renderForm = index => {
    const indexedFieldsName = stepFieldsNames(index);

    return (
      <Fragment key={index}>
        {Component(activeForm, indexedFieldsName, values)}
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
  };

  return [formsArray, addForm];
};
export default useFormGenerator;
