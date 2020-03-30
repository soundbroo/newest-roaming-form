import { changeFullname } from "utils/changeFieldsByInn";

import AxiosService from "api";

export const autoComplete = (inn, formApi, field) => {
  const axios = new AxiosService();
  axios.autoComplete(inn).then(result => {
    const data = JSON.parse(result.data.text)._items[0];
    if (data && inn?.length === 12) {
      const {
        FL: { fam_fl, nam_fl, otch_fl }
      } = data;
      return changeFullname(fam_fl, nam_fl, otch_fl, field, formApi);
    }
    if (data?.kpp && inn?.length === 10) {
      formApi.change(`${field}.kpp`, data.kpp);
      formApi.change(`${field}.name`, data.ul_name.namep);
      return;
    }
  });
};

export const debouncedAutoComplete = (inn, formApi, field) => {
  if (inn?.length === 10 || inn?.length === 12) {
    setTimeout(() => autoComplete(inn, formApi, field), 0);
  }
};
