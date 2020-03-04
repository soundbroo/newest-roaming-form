import React from "react";

import { FormFieldsRow } from "components/Common/styled";
import InputField from "components/Forms/InputField";

import { validate } from "utils/validate";
import { parseInn, parseKpp, parseName } from "utils/parse";

// Дефолтный шаблон с полями ИНН, КПП, Название организации/ФИО

const TemplateDefaultForm = ({
  children,
  name,
  files,
  isEntityInn,
  isOrganizationInn,
  formApi
}) => {
  const isFileLoaded = Boolean(files?.[`${name.split("[")[0]}_list`]);

  if (isEntityInn) {
    formApi.change(`${name}.kpp`, undefined);
  }

  if (isOrganizationInn) {
    formApi.change(`${name}.lastname`, undefined);
    formApi.change(`${name}.firstname`, undefined);
    formApi.change(`${name}.patronymic`, undefined);
  }

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
          disabled={isEntityInn}
          parse={parseKpp}
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
            <InputField name={name} fieldType="lastname" parse={parseName} />
            <InputField name={name} fieldType="firstname" parse={parseName} />
            <InputField
              name={name}
              validate={null}
              fieldType="patronymic"
              parse={parseName}
            />
          </>
        )}
      </FormFieldsRow>
      {children}
    </>
  );
};
export default TemplateDefaultForm;
