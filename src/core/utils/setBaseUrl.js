export const setBaseUrl = () => {
  const apiUrl = "http://roaming.api.staging.keydisk.ru";
  const productionUrl = "https://roaming.edo.keydisk.ru";

  if (window.location.origin === "http://localhost:3001") return apiUrl;
  if (window.location.origin === "http://roaming.staging.keydisk.ru")
    return apiUrl;
  if (window.location.origin === "https://roaming.astral.ru")
    return productionUrl;
};
