import { INN_LENGTH, KPP_LENGTH } from "constants";

export const required = value => (value ? undefined : "Обязательное поле");

export const disableAllBesidesInn = ({ name, index, values }) => {
  const nameLabel = name.slice(0, -3);
  const inn = values?.[nameLabel][index]?.inn;
  const isEntityInn = inn?.length === INN_LENGTH[1];
  const isOrganizationInn = inn?.length === INN_LENGTH[0];
  const isValidInn = INN_LENGTH.includes(inn?.length);

  return { isEntityInn, isOrganizationInn, isValidInn };
};

export const validate = {
  inn: value =>
    INN_LENGTH.includes(value?.length) ? undefined : "Некорректный ИНН",
  email: value =>
    value?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ? undefined
      : "Некорректный Email",
  kpp: value => (value?.length === KPP_LENGTH ? undefined : "Некорректный КПП"),
  id: value => {
    if (value === undefined || value?.match(/\s/)) {
      return "Некорректный идентификатор";
    }
    return undefined;
  }
};

export const validateInn = value =>
  INN_LENGTH.includes(value?.length) ? undefined : "Некорректный ИНН";

export const validateEmail = value =>
  value?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? undefined : "Некорректный Email";

export const validateKpp = value =>
  value?.length === KPP_LENGTH ? undefined : "Некорректный КПП";

export const validateId = value => {
  if (value === undefined || value?.match(/\s/)) {
    return "Некорректный идентификатор";
  }
  return undefined;
};
