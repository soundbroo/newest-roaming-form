import React, { useState, useEffect } from "react";

import { FormFieldsRow } from "components/Common/styled";

import InputField from "components/Forms/InputField";

import { required, validateInn, validateKpp, validate } from "utils/validate";
import { parseInn, parseKpp } from "utils/parse";

// Дефолтный шаблон с полями ИНН, КПП, Название организации/ФИО

const TemplateDefaultForm = ({
  children,
  name,
  files,
  isEntityInn,
  isOrganizationInn,
  isValidInn,
  formApi
}) => {
  const isFileLoaded = Boolean(files?.[`${name.split("[")[0]}_list`]);

  return (
    <>
      <FormFieldsRow>
        <InputField
          disabled={isFileLoaded}
          parse={parseInn}
          name={name}
          fieldType="inn"
          validate={validate.inn}
        />
        <InputField
          disabled={!isOrganizationInn}
          parse={parseKpp}
          name={name}
          fieldType="kpp"
          validate={isOrganizationInn && validate.kpp}
        />
      </FormFieldsRow>
      <FormFieldsRow>
        {!isEntityInn ? (
          <InputField disabled={!isValidInn} name={name} fieldType="name" />
        ) : (
          <>
            <InputField name={name} fieldType="lastname" />
            <InputField name={name} fieldType="firstname" />
            <InputField name={name} validate={null} fieldType="patronymic" />
          </>
        )}
      </FormFieldsRow>
      {children}
    </>
  );
};
export default TemplateDefaultForm;
