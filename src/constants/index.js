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
        inn: `clients_sender_${formIndex}_inn`,
        kpp: `clients_sender_${formIndex}_kpp`,
        name: `clients_sender_${formIndex}_name`,
        id: `clients_sender_${formIndex}_id`,
        lastname: `clients_sender_${formIndex}_lastname`,
        firstname: `clients_sender_${formIndex}_firstname`,
        patronymic: `clients_sender_${formIndex}_patronymic`
      },
      {
        inn: `clients_receiver_${formIndex}_inn`,
        kpp: `clients_receiver_${formIndex}_kpp`,
        name: `clients_receiver_${formIndex}_name`,
        id: `clients_receiver_${formIndex}_id`,
        lastname: `clients_receiver_${formIndex}_lastname`,
        firstname: `clients_receiver_${formIndex}_firstname`,
        patronymic: `clients_receiver_${formIndex}_patronymic`
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
        inn: `operators_sender_${formIndex}_inn`,
        kpp: `operators_sender_${formIndex}_kpp`,
        name: `operators_sender_${formIndex}_name`,
        id: `operators_sender_${formIndex}_id`,
        lastname: `operators_sender_${formIndex}_lastname`,
        firstname: `operators_sender_${formIndex}_firstname`,
        patronymic: `operators_sender_${formIndex}_patronymic`
      },
      {
        inn: `operators_receiver_${formIndex}_inn`,
        kpp: `operators_receiver_${formIndex}_kpp`,
        name: `operators_receiver_${formIndex}_name`,
        id: `operators_receiver_${formIndex}_id`,
        lastname: `operators_receiver_${formIndex}_lastname`,
        firstname: `operators_receiver_${formIndex}_firstname`,
        patronymic: `operators_receiver_${formIndex}_patronymic`
      }
    ],
    typeDataTitle: "Введите данные вашего клиента"
  }
};

export const MAX_NUMBER_OF_FORMS = 99;

export const VALIDATION_FORM_TITLE = {
  sender: "Ваши данные",
  receiver: "Данные контрагентов"
};
