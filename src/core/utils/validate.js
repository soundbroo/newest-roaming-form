export const required = value => (value ? undefined : "Обязательное поле");

export const validateInn = ({ value, isFullnameShown, setIsFullNameShown }) =>
  value?.length === 12 ? console.log(value, isFullnameShown) : undefined;
