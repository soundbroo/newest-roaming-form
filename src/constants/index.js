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
    typeDataTitle: "Введите данные вашего клиента"
  }
};

export const FIELDS_NAMES = {
  inn: {
    type: "inn",
    label: "ИНН"
  },
  kpp: {
    type: "kpp",
    label: "КПП"
  },
  name: {
    type: "name",
    label: "Название организации"
  },
  id: {
    type: "id",
    label: "Идентификатор"
  },
  lastname: {
    type: "lastname",
    label: "Фамилия"
  },
  firstname: {
    type: "firstname",
    label: "Имя"
  },
  patronymic: {
    type: "patronymic",
    label: "Отчество"
  },
  operator: {
    type: "operator",
    label: "Выберете оператора"
  },
  request_id: {
    type: "request_id",
    label: "Идентификатор заявки в системе роумингового оператора"
  }
};

export const MAX_NUMBER_OF_FORMS = 99;

export const VALIDATION_FORM_TITLE = {
  noDataToSend: "Нет данных для отправки",
  noDataDescription: `Отстутствуют или недостаточно данных для отправки на сервер.
  Проверьте введенные данные на шагах:`,
  sender: "Ваши данные",
  receiver: "Данные контрагентов"
};

export const TITLES_FOR_KEYS = {
  inn: "ИНН",
  kpp: "КПП",
  name: "Название организации",
  id: "Идентификатор",
  lastname: "Фамилия",
  firstname: "Имя",
  patronymic: "Отчество"
};

export const OPERATORS = [
  {
    value: "2JD",
    label: "АО НИИАС – 2JD"
  },
  {
    value: "2BN",
    label: "Линк-Сервис – 2BN"
  },
  {
    value: "2BM",
    label: "СКБ Контур.Диадок – 2BM"
  },
  {
    value: "2AL",
    label: "Такском – 2AL"
  },
  {
    value: "2AK",
    label: "ТаксНет – 2AK"
  },
  {
    value: "2BE",
    label: "Тензор СБиС – 2BE"
  },
  {
    value: "2IG",
    label: "Synerdocs – 2IG"
  }
];
