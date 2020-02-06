import React from "react";
import { Form, Field } from "react-final-form";
import styled from "styled-components";

import TextFieldAdapter from "components/Common/TextFieldAdapter";
import { FormFieldsRow } from "components/Common/styled";

import { required, validateInn } from "utils/validate";

// Дефолтный шаблон с полями ИНН, КПП, Название организации/ФИО

const TemplateDefaultForm = ({ activeForm, stepFieldsNames }) => {
  // const [isEntityInn, setIsEntityInn] = useState(true)

  return (
    <>
      <FormFieldsRow>
        <Field
          name={stepFieldsNames[activeForm].inn}
          component={TextFieldAdapter}
          validate={validateInn}
          label="ИНН"
        />
        <Field
          name={stepFieldsNames[activeForm].kpp}
          component={TextFieldAdapter}
          validate={required}
          label="КПП"
        />
      </FormFieldsRow>
      <FormFieldsRow>
        <Field
          name={stepFieldsNames[activeForm].name}
          component={TextFieldAdapter}
          validate={required}
          label="Название организации"
        />
      </FormFieldsRow>
    </>
  );
};
export default TemplateDefaultForm;
