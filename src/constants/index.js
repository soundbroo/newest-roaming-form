export const FORM_TITLES = {
  clients: {
    id: 0,
    mainTitle: "Заявление на подключение роуминга между контрагентами",
    stepTitles: [
      "Данные вашей организации",
      "Данные контрагентов",
      "Проверка введенных данных"
    ],
    typeDataTitle: "Введите данные вашей организации"
  },
  operators: {
    id: 1,
    mainTitle: "Заявление на подключение роуминга между контрагентами",
    stepTitles: [
      "Данные вашего клиента",
      "Контрагенты в АО Калуга Астрал",
      "Проверка введенных данных"
    ],
    stepFieldsNames: formIndex => [
      {
        inn: `sender${formIndex}Inn`,
        kpp: `sender${formIndex}Kpp`,
        name: `sender${formIndex}Name`,
        id: `sender${formIndex}Id`,
        lastname: `sender${formIndex}Lastname`,
        firstname: `sender${formIndex}Firstname`,
        patronymic: `sender${formIndex}Patronymic`
      },
      {
        inn: `receiver${formIndex}Inn`,
        kpp: `receiver${formIndex}Kpp`,
        name: `receiver${formIndex}Name`,
        id: `receiver${formIndex}Id`,
        lastname: `receiver${formIndex}Lastname`,
        firstname: `receiver${formIndex}Firstname`,
        patronymic: `receiver${formIndex}Patronymic`
      }
    ],
    typeDataTitle: "Введите данные вашего клиента"
  }
};
