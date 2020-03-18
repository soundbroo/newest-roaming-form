const setUrl = () => {
  const apiUrl = "http://roaming.api.staging.keydisk.ru";
  const productionUrl = "https://roaming.astral.ru";

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

const url = setUrl();

export const ABONENT_LIST = `${url}/templates/abonent_receiver_list.xlsx`;
export const OPERATOR_LIST = `${url}/templates/operator_sender_list.xlsx`;
export const RECEIVER_LIST = `${url}/templates/receiver_list.xlsx`;
export const AGREEMENT_TEMPLATE = `${url}/templates/agreement_template.doc`;
