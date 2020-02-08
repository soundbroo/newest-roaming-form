import React from "react";
import { Form, Field } from "react-final-form";
import styled from "styled-components";

import TextFieldAdapter from "components/Common/TextFieldAdapter";
import FormFieldsWrapper from "components/Common/FormFieldsWrapper";
import TemplateDefaultForm from "components/Forms/TemplateDefaultForm";
import { FormFieldsRow } from "components/Common/styled";

import { required } from "utils/validate";

// Инпуты для формы операторов

// Шаблон для страницы Операторам с полями ИНН, КПП, Название организации/ФИО, Идентификатор

const TemplateOperatorsForm = ({
  activeForm,
  stepFieldsNames,
  deleteForm,
  index
}) => (
  <FormFieldsWrapper deleteForm={() => deleteForm(index)}>
    <div>{index}</div>
    <TemplateDefaultForm
      activeForm={activeForm}
      stepFieldsNames={stepFieldsNames}
    />
    <FormFieldsRow>
      <Field
        name={stepFieldsNames[activeForm].id}
        component={TextFieldAdapter}
        validate={required}
        label="Идентификатор"
      />
    </FormFieldsRow>
  </FormFieldsWrapper>
);
export default TemplateOperatorsForm;
