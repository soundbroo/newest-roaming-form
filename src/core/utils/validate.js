import { INN_LENGTH } from "constants";

export const required = value => (value ? undefined : "Обязательное поле");

export const disableAllBesidesInn = ({ name, index, values }) => {
  const nameLabel = name.slice(0, -3);
  const inn = values?.[nameLabel][index]?.inn;
  const isEntityInn = inn?.length === 12;
  const isValidInn = INN_LENGTH.includes(inn?.length);

  return { isEntityInn, isValidInn };
};
