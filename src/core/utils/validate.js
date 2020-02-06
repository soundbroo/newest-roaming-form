export const required = value => (value ? undefined : "Обязательное поле");

export const validateInn = value =>
  value?.length < 10 ? "Тест Неверный ИНН" : undefined;
