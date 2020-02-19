import React from "react";

import { FormFieldsRow } from "components/Common/styled";

import InputField from "components/Forms/InputField";

import { required, validateInn, validateKpp } from "utils/validate";
import { parseInn, parseKpp } from "utils/parse";

// Дефолтный шаблон с полями ИНН, КПП, Название организации/ФИО

const TemplateDefaultForm = ({
  children,
  name,
  files,
  isEntityInn,
  isOrganizationInn,
  isValidInn
}) => {
  const ifFileLoaded = Boolean(files?.[`${name.split("[")[0]}_list`]);
  return (
    <>
      {ifFileLoaded && (
        <div>Заполнение формы недоступно при загруженном файле xls/xlsx</div>
      )}
      <FormFieldsRow>
        <InputField
          disabled={ifFileLoaded}
          parse={parseInn}
          name={name}
          fieldType="inn"
          validate={validateInn}
        />
        <InputField
          disabled={!isOrganizationInn}
          parse={parseKpp}
          name={name}
          fieldType="kpp"
          validate={validateKpp}
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
