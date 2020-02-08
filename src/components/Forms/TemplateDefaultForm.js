import React, { useState, useEffect, useContext } from "react";
import { Form, Field } from "react-final-form";
import styled from "styled-components";

import { FormsValuesContext } from "utils/context";
import TextFieldAdapter from "components/Common/TextFieldAdapter";
import { FormFieldsRow } from "components/Common/styled";

import { required, validateInn } from "utils/validate";

// Дефолтный шаблон с полями ИНН, КПП, Название организации/ФИО

const TemplateDefaultForm = ({ activeForm, stepFieldsNames }) => {
  const [isFullNameShown, setIsFullNameShown] = useState(false);

  // const [values, setValues] = useContext(FormsValuesContext);

  // useEffect(() => {
  //   setValues({ test: "test" });
  //   const innName = stepFieldsNames?.[activeForm]?.inn;
  //   switch (values?.[innName]?.length) {
  //     case 11:
  //       return setIsFullNameShown(false);
  //     case 12:
  //       return setIsFullNameShown(true);
  //     case 13:
  //       return setIsFullNameShown(false);
  //   }
  // }, []);

  return (
    <>
      <FormFieldsRow>
        <Field
          name={stepFieldsNames[activeForm].inn}
          component={TextFieldAdapter}
          validate={required}
          label="ИНН*"
        />
        <Field
          name={stepFieldsNames[activeForm].kpp}
          component={TextFieldAdapter}
          validate={required}
          label="КПП"
        />
      </FormFieldsRow>
      <FormFieldsRow>
        {!isFullNameShown ? (
          <Field
            name={stepFieldsNames[activeForm].name}
            component={TextFieldAdapter}
            validate={required}
            label="Название организации"
          />
        ) : (
          <>
            <Field
              name={stepFieldsNames[activeForm].lastname}
              component={TextFieldAdapter}
              validate={required}
              label="Фамилия*"
            />
            <Field
              name={stepFieldsNames[activeForm].firstname}
              component={TextFieldAdapter}
              validate={required}
              label="Имя*"
            />
            <Field
              name={stepFieldsNames[activeForm].patronymic}
              component={TextFieldAdapter}
              validate={required}
              label="Отчество"
            />
          </>
        )}
      </FormFieldsRow>
    </>
  );
};
export default TemplateDefaultForm;
