import React, { useEffect } from "react";

import { FormFieldsRow } from "components/Common/styled";
import InputField from "components/Fields/InputField";

import { validate } from "utils/validate";
import { parse } from "utils/parse";

import AxiosService from "api";

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
  const axios = new AxiosService();
  const isFileLoaded = Boolean(files?.[`${name.split("[")[0]}_list`]);

  const changeFullname = (lastname, firstname, patronymic) => {
    formApi.change(`${name}.lastname`, lastname);
    formApi.change(`${name}.firstname`, firstname);
    formApi.change(`${name}.patronymic`, patronymic);
  };

  if (isEntityInn) {
    formApi.change(`${name}.kpp`, undefined);
  }

  if (isOrganizationInn) {
    changeFullname(undefined, undefined, undefined);
  }

  const [type, number] = name.split("[");
  const index = number.replace("]", "");
  let inn = values?.[type]?.[index]?.inn;

  const autoComplete = async () => {
    const result = await axios.autoComplete(inn);
    const data = JSON.parse(result.data.text)._items[0];
    if (data && inn?.length === 12) {
      const {
        FL: { fam_fl, nam_fl, otch_fl }
      } = data;
      return changeFullname(fam_fl, nam_fl, otch_fl);
    }
    if (data?.kpp && inn?.length === 10) {
      formApi.change(`${name}.kpp`, data.kpp);
      formApi.change(`${name}.name`, data.ul_name.namep);
      return;
    }
  };

  const debouncedAutoComplete = () => {
    if (inn?.length === 10 || inn?.length === 12) {
      setTimeout(() => autoComplete(), 0);
    }
  };

  useEffect(() => {
    inn = null;
  }, [activePage]);

  useEffect(() => {
    debouncedAutoComplete();
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
