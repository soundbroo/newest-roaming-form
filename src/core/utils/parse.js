const nums = (value) => value.replace(/[^\d]/g, "");

export const parseDefault = (value) => value.slice(0, 255);

const parseTicket = (value) => value.replace(" ", "");

export const parseName = (value) =>
  value.replace(/[a-zA-Z]/g, "").slice(0, 255);

export const parseInn = (value) => nums(value).substr(0, 12);

export const parseKpp = (value) => value.substr(0, 9);

export const parseFullname = (value) =>
  value.replace(/[^а-яёА-ЯЁ-\s]/g, "").slice(0, 64);

export const parseId = (value) => {
  if (!value) return value;
  const id = value.replace(/[^0-9a-zA-Z-]/g, "");

  return id.slice(0, 39);

  // if (id.length <= 11) {
  //   return id;
  // }
  // if (id.length <= 15) return `${id.slice(0, 11)}-${id.slice(11, 15)}`;
  // if (id.length <= 19)
  //   return `${id.slice(0, 11)}-${id.slice(11, 15)}-${id.slice(15, 19)}`;
  // if (id.length <= 23)
  //   return `${id.slice(0, 11)}-${id.slice(11, 15)}-${id.slice(
  //     15,
  //     19
  //   )}-${id.slice(19, 23)}`;
  // return `${id.slice(0, 11)}-${id.slice(11, 15)}-${id.slice(15, 19)}-${id.slice(
  //   19,
  //   23
  // )}-${id.slice(23, 35)}`;
};

const parseOperatorId = (value) =>
  value.replace(/[^0-9a-zA-Z@.,-]/g, "").slice(0, 46);

export const parse = {
  name: (value) => parseName(value),
  inn: (value) => parseInn(value),
  kpp: (value) => parseKpp(value),
  id: (value) => parseId(value),
  operatorId: (value) => parseOperatorId(value),
  lastname: (value) => parseFullname(value),
  firstname: (value) => parseFullname(value),
  patronymic: (value) => parseFullname(value),
  email: (value) => parseDefault(value),
  ticket_number: (value) => parseTicket(value),
};
