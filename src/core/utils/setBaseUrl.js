export const setBaseUrl = () => {
  const apiUrl = "http://roaming.api.staging.keydisk.ru";
  const productionUrl = "https://roaming.edo.keydisk.ru";

  switch (window.location.origin) {
    case "http://localhost:3001":
    case "https://roaming.staging.keydisk.ru":
    case "http://roaming.staging.keydisk.ru":
      return apiUrl;
    case "https://roaming.astral.ru":
    case "http://roaming.astral.ru":
      return productionUrl;
  }
};
