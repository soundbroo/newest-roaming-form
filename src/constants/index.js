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
    label: "Укажите оператора вашего контрагента"
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
export const KPP_REGEXP = /^([0-9]{1}[1-9]{1}|[1-9]{1}[0-9]{1})([0-9]{2})([0-9A-Z]{2})([0-9]{3})$/;
export const EMAIL_REGEXP = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,7}$/;

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
    "Вы можете загрузить файл в формате .xlsx, если он сопоставим с шаблоном",
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
    value: "2BN",
    label: "ООО Линк-Сервис – 2BN"
  },
  {
    value: "2JD",
    label: "АО НИИАС – 2JD"
  },
  {
    value: "2BM",
    label: "АО ПФ СКБ Контур – 2BM"
  },
  {
    value: "2AL",
    label: "ООО Такском – 2AL"
  },
  {
    value: "2AK",
    label: "ЗАО ТаксНет – 2AK"
  },
  {
    value: "2BE",
    label: "ООО Компания Тензор – 2BE"
  },
  {
    value: "2IG",
    label: "ООО Директум – 2IG"
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
  list: ["xlsx"]
};

export const ASTRAL_ID = "2AE";

export const BUTTON_TITLES = {
  pickFile: "Выбрать файл",
  uploadAgreement: "Соглашение о выборе оператора"
};

export const LINK_TITLES = {
  agreement: "Загрузить шаблон соглашения о выборе оператора"
};

export const MESSAGES = {
  addClient:
    "Перед добавлением контрагента необходимо заполнить все недостающие поля",
  fileNotSupported: "Отправка файлов данного типа не поддерживается",
  retrySubmit: "Авторизация успешна, повторите отправку"
};

export const statuses = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error"
};

export const CATEGORIES = {
  all: "Все категории",
  industrial: "Промышленная эксплуатация",
  testing: "Тестирование обмена",
  negotiation: "Проведение переговоров",
  software: "Доработка ПО, тестирование обмена"
};

export const rows = [
  {
    name: "ДИРЕКТУМ (Synerdocs)",
    cat: CATEGORIES.industrial,
    status: 100
  },
  {
    name: "ИНФОТЕКС Интернет Траст (VipNet ЭДО Документ)",
    cat: CATEGORIES.industrial,
    status: 100
  },
  { name: "КОНТУР (Диадок)", cat: CATEGORIES.industrial, status: 100 },
  {
    name: "КОРУС Консалтинг СНГ (СФЕРА)",
    cat: CATEGORIES.testing,
    status: 75
  },
  { name: "КРИПТЭКС (Signatura)", cat: CATEGORIES.negotiation, status: 25 },
  {
    name: "МТС (Электронный документооборот)",
    cat: CATEGORIES.software,
    status: 50
  },
  { name: "НИИАС (РЖД)", cat: CATEGORIES.industrial, status: 100 },
  { name: "СИСЛИНК (DOCLINK)", cat: CATEGORIES.negotiation, status: 25 },
  { name: "СТЭК НТЦ (СТЭК-ТРАСТ)", cat: CATEGORIES.industrial, status: 100 },
  {
    name: "ТАКСКОМ (Файлер, 1С-Такском)",
    cat: CATEGORIES.industrial,
    status: 100
  },
  { name: "ТАКСНЕТ (Транскрипт)", cat: CATEGORIES.industrial, status: 100 },
  { name: "ТЕНЗОР (СБИС, 1С-ЭДО)", cat: CATEGORIES.industrial, status: 100 },
  {
    name: "ЭТП ГПБ (Система ЭДО ЭТП ГПБ, 1С-ЭДО)",
    cat: CATEGORIES.industrial,
    status: 100
  }
];

export const TEMP_MESSAGE = `Уважаемые абоненты!
Обращаем Ваше внимание, что срок на настройку роуминга между операторами АО Калуга Астрал и СКБ Контур временно увеличен в связи с техническими работами.
Приносим извинения за предоставленные неудобства.`;

export const HELPER_TEXT = {
  astralId: "Идентификатор пользователя в системе ЭДО Калуга Астрал",
  operatorId: "Идентификатор пользователя в системе ЭДО оператора",
  email:
    "Адрес электронной почты, на который будет отправлен результат обработки заявления"
};
