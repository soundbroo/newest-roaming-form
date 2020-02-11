import React, { useState, useEffect, useContext } from "react";
import { Field } from "react-final-form";

import TextFieldAdapter from "components/Common/TextFieldAdapter";
import { FormFieldsRow } from "components/Common/styled";

import InputField from "components/Forms/InputField";

import { required } from "utils/validate";

import { INN_LENGTH } from "constants";

// Дефолтный шаблон с полями ИНН, КПП, Название организации/ФИО

const TemplateDefaultForm = ({ children, name, isEntityInn, isValidInn }) => {
  return (
    <>
      <FormFieldsRow>
        <InputField name={name} fieldType="inn" />
        <InputField disabled={!isEntityInn} name={name} fieldType="kpp" />
      </FormFieldsRow>
      <FormFieldsRow>
        {!isEntityInn ? (
          <InputField disabled={!isValidInn} name={name} fieldType="name" />
        ) : (
          <>
            <InputField name={name} fieldType="lastname" />
            <InputField name={name} fieldType="firstname" />
            <InputField name={name} fieldType="patronymic" />
          </>
        )}
      </FormFieldsRow>
      {children}
    </>
  );
};
export default TemplateDefaultForm;
