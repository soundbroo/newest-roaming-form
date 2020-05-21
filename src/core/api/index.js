import axios from "axios";
import { setBaseUrl } from "utils/setBaseUrl";
import setIdPrefix from "utils/autoPrefixer";

class AxiosService {
  constructor() {
    this.instance = axios.create({
      baseURL: setBaseUrl(),
    });
    this.instance.defaults.withCredentials = true;
    this.config = {
      json: {
        headers: {
          "Content-Type": "application/json",
        },
      },
      multipart: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    };

    this.toJSON = (value) => {
      return JSON.stringify(value, 0, 2);
    };

    this.toJSONWithoutQuotes = (value) => {
      return this.toJSON(value).replace(/"/g, "");
    };
    // Добавляем префиксы операторов
    this.setPrefix = (data, type, activePage) => {
      if (data?.[type]) {
        data[type] = data?.[type].map((el) => {
          if (el?.id) {
            const id = setIdPrefix(el.id, type, activePage);
            return { ...el, id: id };
          }
          return { ...el };
        });
      }
    };
    // Формируем тело запроса
    this.setFormData = ({ values, activePage, filesToReload }) => {
      const formData = new FormData();
      const data = {};
      const prepareData = (type) => {
        // Удаляем лишние поля

        if (data?.[type]) {
          data?.[type].map((el) => {
            if (el?.inn?.length === 10) {
              delete el.firstname;
              delete el.lastname;
              delete el.patronymic;
            } else if (el?.inn?.length === 12) {
              delete el.kpp;
              delete el.name;
            }
          });
        }

        this.setPrefix(data, type, activePage);
      };

      if (!values?.sender_list) data.sender = values.sender;
      if (!values?.receiver_list) data.receiver = values.receiver;
      if (values?.operator) data.operator = values.operator;

      prepareData("sender");
      prepareData("receiver");

      values?.agreement && formData.append("agreement", values.agreement);
      if (values?.request_id) data.request_id = values.request_id;

      if (filesToReload.sender_list !== null) {
        formData.append("sender_list", filesToReload.sender_list);
      } else if (values?.sender_list) {
        formData.append("sender_list", values.sender_list);
      }

      if (filesToReload.receiver_list !== null) {
        formData.append("receiver_list", filesToReload?.receiver_list);
      } else if (values?.receiver_list) {
        formData.append("receiver_list", values.receiver_list);
      }

      formData.append("data", this.toJSON(data));

      return formData;
    };
  }

  auth = async (data) => {
    const formData = new FormData();
    formData.append("login", this.toJSONWithoutQuotes(data.login.trim()));
    formData.append("password", this.toJSONWithoutQuotes(data.password.trim()));
    try {
      const result = await this.instance.post(
        "/auth",
        formData,
        this.config.json
      );
      console.log("Result - ", result);
      const {
        data: { status, text },
      } = result;

      return { status, text };
    } catch (e) {
      console.log("Error - ", e);
    }
  };

  abonent = async ({
    values,
    activePage,
    setRequestStatus,
    setResponse,
    filesToReload,
  }) => {
    try {
      const result = await this.instance.post(
        "/abonent",
        this.setFormData({ values, activePage, filesToReload }),
        this.config.multipart
      );
      setRequestStatus(result);
      setResponse(result);
      console.log("Result - ", result);
      return result;
    } catch (e) {
      console.log("Error - ", e);
    }
  };

  operator = async ({
    values,
    activePage,
    setRequestStatus,
    setResponse,
    filesToReload,
    auth,
    setAuth,
  }) => {
    try {
      const result = await this.instance.post(
        "/operator",
        this.setFormData({ values, activePage, filesToReload }),
        this.config.multipart
      );
      if (result.data.status === 401) {
        return setAuth({ ...auth, refresh: true });
      }
      setResponse(result);
      if (result.data.status === 0 && result.data.text !== "")
        setRequestStatus(result);
      console.log("Result - ", result);
    } catch (e) {
      console.log("Error - ", e);
    }
  };

  status = async (uid, request_id) => {
    try {
      const result = await this.instance.get(
        `/abonent/status/${uid}/${request_id}`
      );
      console.log("Result - ", result);
      return result;
    } catch (e) {
      console.log("Error - ", e);
    }
  };

  request = async (uid, request_id) => {
    try {
      const result = await this.instance.get(`/abonent/${uid}/${request_id}`);
      console.log("Result - ", result);
      return result;
    } catch (e) {
      console.log("Error - ", e);
    }
  };

  operators_list = async () => {
    try {
      const result = await this.instance.get(`/operator_list`);
      console.log("Result - ", result);
      return result;
    } catch (e) {
      console.log("Error - ", e);
    }
  };

  autoComplete = async (inn) => {
    try {
      const result = await this.instance.get(`/navigator/${inn}`);
      console.log("Result - ", result);
      return result;
    } catch (e) {
      console.log("Error - ", e);
    }
  };

  contragents = async (inn, kpp) => {
    try {
      const result = kpp
        ? await this.instance.get(`/abonent/info/${inn}/${kpp}`)
        : await this.instance.get(`/abonent/info/${inn}`);
      console.log("Result - ", result);
      return result;
    } catch (e) {
      console.log("Error - ", e);
    }
  };
}

export default AxiosService;
