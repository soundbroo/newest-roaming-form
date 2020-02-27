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
    label: "Выберите оператора"
  },
  request_id: {
    type: "request_id",
    label: "Идентификатор заявки в системе роумингового оператора"
  },
  email: {
    type: "email",
    label: "Email"
  }
};

export const MAX_NUMBER_OF_FORMS = 99;

export const INN_LENGTH = [10, 12];

export const KPP_LENGTH = 9;

export const VALIDATION_FORM_TITLE = {
  noDataToSend: "Нет данных для отправки",
  noDataDescription: `Отстутствуют или недостаточно данных для отправки на сервер.
  Проверьте введенные данные на шагах:`,
  sender: "Ваши данные",
  receiver: "Данные контрагентов"
};

export const UPLOAD_MODAL_CONTENT = {
  title: "Загрузить список контрагентов",
  info:
    "Вы можете загрузить файл в формате .xls/.xlsx, если он сопоставим с шаблоном",
  warning:
    "Обратите внимание, что отправка формы по данным из файла удалит все данные контрагентов, введенные вручную"
};

export const AGREEMENT_LOADED_TITLE = "Соглашение о выборе оператора загружено";

export const TITLES_FOR_KEYS = {
  inn: "ИНН",
  kpp: "КПП",
  name: "Название организации",
  id: "Идентификатор",
  lastname: "Фамилия",
  firstname: "Имя",
  patronymic: "Отчество",
  request_id: "Идентификатор заявки в системе роумингового оператора",
  email: "Email",
  operator: "Оператор",
  agreement: "Соглашение о выборе оператора"
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

// Операторы, которым нужно поле
// "Идентификатор в системе роумингового оператора"
// Как у Контура

export const OPERATORS_WITH_REQUEST_ID = ["2BM"];

// Операторы, которым нужно соглашение о выборе оператора

export const OPERATORS_WITH_AGREEMENT = ["2BM", "2BE"];

export const AVAILABLE_FILE_EXTENSIONS = {
  agreement: ["pdf", "png", "jpg"],
  list: ["xlsx", "xls"]
};

export const ASTRAL_ID = "2AE";

export const BUTTON_TITLES = {
  pickFile: "Выбрать файл",
  uploadAgreement: "Загрузить соглашение о выборе оператора"
};

export const MESSAGES = {
  addClient:
    "Перед добавлением клиента необходимо заполнить все недостающие поля",
  fileNotSupported: "Отправка файлов данного типа не поддерживается"
};

export const statuses = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error"
};
