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
    stepFieldsNames: [
      {
        inn: "senderInn",
        kpp: "senderKpp",
        name: "senderName",
        id: "senderId",
        lastname: "senderLastname",
        firstname: "senderFirstname",
        patronymic: "senderPatronymic"
      },
      {
        inn: "receiverInn",
        kpp: "receiverKpp",
        name: "receiverName",
        id: "receiverId",
        lastname: "receiverLastname",
        firstname: "receiverFirstname",
        patronymic: "receiverPatronymic"
      }
    ],
    typeDataTitle: "Введите данные вашего клиента"
  }
};
