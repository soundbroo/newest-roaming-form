const nums = value => value.replace(/[^\d]/g, "");

export const parseName = value => value.replace(/[\d]/g, "");

export const parseInn = value => nums(value).substr(0, 12);

export const parseKpp = value => nums(value).substr(0, 9);

export const parseId = value => {
  if (!value) return value;
  const id = value.replace(/[^\w]/g, "").toUpperCase();

  if (id.length <= 8) {
    return id;
  }
  if (id.length <= 12) return `${id.slice(0, 8)}-${id.slice(8, 12)}`;
  if (id.length <= 16)
    return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}`;
  if (id.length <= 20)
    return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(
      16,
      20
    )}`;
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(
    16,
    20
  )}-${id.slice(20, 32)}`;
};
