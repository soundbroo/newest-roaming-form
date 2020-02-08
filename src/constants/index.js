export const FORM_TITLES = {
  clients: {
    id: 0,
    mainTitle: "Заявление на подключение роуминга между контрагентами",
    stepTitles: [
      "Данные вашей организации",
      "Данные контрагентов",
      "Проверка введенных данных"
    ],
    stepFieldsNames: formIndex => [
      {
        inn: `clientsSender${formIndex}Inn`,
        kpp: `clientsSender${formIndex}Kpp`,
        name: `clientsSender${formIndex}Name`,
        id: `clientsSender${formIndex}Id`,
        lastname: `clientsSender${formIndex}Lastname`,
        firstname: `clientsSender${formIndex}Firstname`,
        patronymic: `clientsSender${formIndex}Patronymic`
      },
      {
        inn: `clientsReceiver${formIndex}Inn`,
        kpp: `clientsReceiver${formIndex}Kpp`,
        name: `clientsReceiver${formIndex}Name`,
        id: `clientsReceiver${formIndex}Id`,
        lastname: `clientsReceiver${formIndex}Lastname`,
        firstname: `clientsReceiver${formIndex}Firstname`,
        patronymic: `clientsReceiver${formIndex}Patronymic`
      }
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
        inn: `operatorsSender${formIndex}Inn`,
        kpp: `operatorsSender${formIndex}Kpp`,
        name: `operatorsSender${formIndex}Name`,
        id: `operatorsSender${formIndex}Id`,
        lastname: `operatorsSender${formIndex}Lastname`,
        firstname: `operatorsSender${formIndex}Firstname`,
        patronymic: `operatorsSender${formIndex}Patronymic`
      },
      {
        inn: `operatorsReceiver${formIndex}Inn`,
        kpp: `operatorsReceiver${formIndex}Kpp`,
        name: `operatorsReceiver${formIndex}Name`,
        id: `operatorsReceiver${formIndex}Id`,
        lastname: `operatorsReceiver${formIndex}Lastname`,
        firstname: `operatorsReceiver${formIndex}Firstname`,
        patronymic: `operatorsReceiver${formIndex}Patronymic`
      }
    ],
    typeDataTitle: "Введите данные вашего клиента"
  }
};

export const MAX_NUMBER_OF_FORMS = 99;
