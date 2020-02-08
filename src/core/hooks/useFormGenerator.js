import React, { Fragment, useState, useEffect } from "react";

import { MAX_NUMBER_OF_FORMS } from "constants";

// Шаблон для страницы Операторам - Данные вашего клиента

const useFormGenerator = ({
  component: Component,
  activeForm,
  stepFieldsNames
}) => {
  // const [numberOfForms, setNumberOfForms] = useState(0);

  // console.log("activePage", activePage, "stepFieldsNames", stepFieldsNames);

  const renderForm = index => {
    const indexedFieldsName = stepFieldsNames(index);
    // console.log(indexedFieldsName);
    return (
      <Fragment key={index}>
        <Component
          index={index}
          activeForm={activeForm}
          stepFieldsNames={indexedFieldsName}
          deleteForm={deleteForm}
        />
      </Fragment>
    );
  };

  const [formsArray, setFormsArray] = useState([renderForm(0)]);

  const addForm = () => {
    if (formsArray.length - 1 < MAX_NUMBER_OF_FORMS) {
      // const index = numberOfForms + 1;
      // setNumberOfForms(index);
      setFormsArray([...formsArray, renderForm(formsArray.length)]);
    }
  };

  const deleteForm = key => {
    if (key > 0) {
      // console.log(formsArray);
      setFormsArray(() => {
        formsArray.slice(key, 1);
        return [...formsArray];
      });
      // console.log(formsArray);
    }
  };

  return [formsArray, addForm];
};
export default useFormGenerator;
