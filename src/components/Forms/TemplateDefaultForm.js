import React, { useState, useEffect, useContext } from "react";
import { Field } from "react-final-form";

import TextFieldAdapter from "components/Common/TextFieldAdapter";
import { FormFieldsRow } from "components/Common/styled";

import InputField from "components/Forms/InputField";

import { required, validateInn } from "utils/validate";

import { FIELDS_NAMES } from "constants";

// Дефолтный шаблон с полями ИНН, КПП, Название организации/ФИО

const TemplateDefaultForm = ({ children, name }) => {
  const [isFullNameShown, setIsFullNameShown] = useState(false);

  return (
    <>
      <FormFieldsRow>
        <InputField name={name} fieldType="inn" />
        <InputField name={name} fieldType="kpp" />
      </FormFieldsRow>
      <FormFieldsRow>
        {!isFullNameShown ? (
          <InputField name={name} fieldType="name" />
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
