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
    INN_LENGTH.includes(value?.trim().length) ? undefined : "Некорректный ИНН",
  email: value =>
    value?.match(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
      ? undefined
      : "Некорректный Email",
  kpp: value =>
    value?.trim().length === KPP_LENGTH ? undefined : "Некорректный КПП",
  id: value => {
    if (value === undefined || value?.length < 36) {
      return "Некорректный идентификатор";
    }
    return undefined;
  }
};
