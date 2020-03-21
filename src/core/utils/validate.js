import { INN_LENGTH, KPP_REGEXP, ID_REGEXP, EMAIL_REGEXP } from "constants";

const requiredField = "Обязательное поле";
const maxLength = "Достигнуто максимальное количество символов";

export const required = value => (value ? undefined : requiredField);

export const disableRules = ({ name, index, values }) => {
  const nameLabel = index < 10 ? name.slice(0, -3) : name.slice(0, -4);
  const inn = values?.[nameLabel][index]?.inn;
  const isEntityInn = inn?.length === INN_LENGTH[1];
  const isOrganizationInn = inn?.length === INN_LENGTH[0];
  const isValidInn = INN_LENGTH.includes(inn?.length);

  return { isEntityInn, isOrganizationInn, isValidInn };
};

export const correctKpp = value => {
  if (!value) return requiredField;
  if (KPP_REGEXP.test(value)) return undefined;
  return "КПП некорректен";
};

export const correctId = value => {
  if (!value) return requiredField;
  if (ID_REGEXP.test(value)) return undefined;
  return "Идентификатор некорректен";
};

export const correctName = value => {
  if (!value) return requiredField;
  if (value.length >= 255) return maxLength;
};

export const correctNotRequiredId = value => {
  if (!value || ID_REGEXP.test(value)) return undefined;
  return "Идентификатор некорректен";
};

export const correctOperatorId = value => {
  if (!value) return requiredField;
  if (value.length >= 43) return maxLength;
  if (!value.match(/^[0-9a-zA-Z@.,-]{0,43}$/))
    return "Идентификатор некорректен";
};

const correctInn = value => {
  if (!value) return requiredField;

  const inn = String(value);

  if (inn.length === 10 || inn.length === 12) {
    if (inn.split("").every(num => num === "0")) return "ИНН некорректен";
  }

  if (inn.length === 10) {
    const checkSum = (
      ((2 * inn[0] +
        4 * inn[1] +
        10 * inn[2] +
        3 * inn[3] +
        5 * inn[4] +
        9 * inn[5] +
        4 * inn[6] +
        6 * inn[7] +
        8 * inn[8]) %
        11) %
      10
    ).toString();

    if (inn[9] === checkSum) {
      return undefined;
    }
  }
  if (inn.length === 12) {
    const checkSum1 = (
      ((7 * inn[0] +
        2 * inn[1] +
        4 * inn[2] +
        10 * inn[3] +
        3 * inn[4] +
        5 * inn[5] +
        9 * inn[6] +
        4 * inn[7] +
        6 * inn[8] +
        8 * inn[9]) %
        11) %
      10
    ).toString();

    const checkSum2 = (
      ((3 * inn[0] +
        7 * inn[1] +
        2 * inn[2] +
        4 * inn[3] +
        10 * inn[4] +
        3 * inn[5] +
        5 * inn[6] +
        9 * inn[7] +
        4 * inn[8] +
        6 * inn[9] +
        8 * inn[10]) %
        11) %
      10
    ).toString();

    if (inn[10] === checkSum1 && inn[11] === checkSum2) {
      return undefined;
    }
  }
  return "ИНН некорректен";
};

export const correctEmail = value => {
  if (!value) return requiredField;
  if (value.length >= 255) return maxLength;
  if (value === undefined || EMAIL_REGEXP.test(value)) return undefined;
  return "E-mail некорректен";
};

export const validate = {
  inn: value => correctInn(value),
  name: value => correctName(value),
  email: value => correctEmail(value),
  kpp: value => correctKpp(value),
  id: value => correctId(value),
  operatorId: value => correctOperatorId(value),
  notRequiredId: value => correctNotRequiredId(value),
  required: value => required(value)
};
