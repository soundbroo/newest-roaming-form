import React, { useEffect } from "react";

import { FormFieldsRow } from "components/Common/styled";
import InputField from "components/Fields/InputField";

import { validate } from "utils/validate";
import { parse } from "utils/parse";
import { effectInnChanges } from "utils/changeFieldsByInn";
import { debouncedAutoComplete } from "utils/autocomplete";

// Дефолтный шаблон с полями ИНН, КПП, Название организации/ФИО

const TemplateDefaultForm = ({
  children,
  name,
  files,
  isEntityInn,
  isOrganizationInn,
  formApi,
  values,
  activePage
}) => {
  const isFileLoaded = Boolean(files?.[`${name.split("[")[0]}_list`]);

  useEffect(() => {
    effectInnChanges(isEntityInn, isOrganizationInn, name, formApi);
  }, [isEntityInn, isOrganizationInn]);

  const [type, number] = name.split("[");
  const index = number.replace("]", "");
  let inn = values?.[type]?.[index]?.inn;

  useEffect(() => {
    inn = null;
  }, [activePage]);

  useEffect(() => {
    debouncedAutoComplete(inn, formApi, name);
  }, [inn]);

  return (
    <>
      <FormFieldsRow>
        <InputField
          disabled={isFileLoaded}
          parse={parse.inn}
          name={name}
          fieldType="inn"
        />
        <InputField
          disabled={isEntityInn}
          parse={parse.kpp}
          name={name}
          fieldType="kpp"
          validate={!isEntityInn && validate.kpp}
        />
      </FormFieldsRow>
      <FormFieldsRow>
        {!isEntityInn ? (
          <InputField name={name} fieldType="name" />
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
