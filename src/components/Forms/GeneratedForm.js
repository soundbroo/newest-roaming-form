import React from "react";
import { Button } from "@material-ui/core";

import useFormGenerator from "hooks/useFormGenerator";
// Шаблон для страницы Операторам - Данные контрагентов

const GeneratedForm = ({ component, activeForm, stepFieldsNames, values }) => {
  const [formsArray, addForm] = useFormGenerator(
    component,
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

export default GeneratedForm;
