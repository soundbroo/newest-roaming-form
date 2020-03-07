import axios from "axios";

class AxiosService {
  constructor() {
    const apiUrl = "http://roaming.api.staging.keydisk.ru/";

    const localServer = "http://localhost:5000/";

    this.instance = axios.create({
      baseURL: apiUrl
    });
    this.config = {
      json: {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      },
      multipart: {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      }
    };

    this.toJSON = value => {
      return JSON.stringify(value, 0, 2);
    };

    this.toJSONWithoutQuotes = value => {
      return this.toJSON(value).replace(/"/g, "");
    };

    this.setFormData = ({ values, activePage, filesToReload }) => {
      const formData = new FormData();
      const data = {};
      const prepareData = type => {
        // Удаляем лишние поля

        if (data?.[type]) {
          data?.[type].map(el => {
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

        // Добавляем префиксы операторов

        if (data?.[type]) {
          data[type] = data?.[type].map(el => {
            switch (activePage) {
              case 0: {
                if (type === "sender") return { ...el, id: `2AE${el.id}` };
                if (type === "receiver") return { ...el };
              }
              case 1: {
                if (type === "sender") {
                  const operator = localStorage.getItem("operator");
                  return { ...el, id: `${operator}${el.id}` };
                }
                if (type === "receiver") {
                  return { ...el, id: `2AE${el.id}` };
                }
              }
            }
          });
        }
      };

      if (!values?.sender_list) data.sender = values.sender;
      if (!values?.receiver_list) data.receiver = values.receiver;
      if (values?.operator) data.operator = values.operator;

      prepareData("sender");
      prepareData("receiver");

      values?.agreement && formData.append("agreement", values.agreement);
      values?.request_id && formData.append("request_id", values.request_id);

      if (filesToReload.sender_list !== null) {
        formData.append("sender_list", filesToReload.sender_list);
      } else if (values?.sender_list) {
        formData.append("sender_list", values.sender_list);
      }

      if (filesToReload.receiver_list !== null) {
        console.log("filesToReload");
        formData.append("receiver_list", filesToReload?.receiver_list);
      } else if (values?.receiver_list) {
        console.log("values?.receiver_list");
        formData.append("receiver_list", values.receiver_list);
      }

      formData.append("data", this.toJSON(data));

      return formData;
    };
  }

  auth = async data => {
    const formData = new FormData();
    formData.append("login", this.toJSONWithoutQuotes(data.login));
    formData.append("password", this.toJSONWithoutQuotes(data.password));
    try {
      const result = await this.instance.post(
        "/auth",
        formData,
        this.config.json
      );
      console.log("Result - ", result);
      const {
        data: { status, text }
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
    filesToReload
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
    setAuth
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
      if (result.data.status === 0) setRequestStatus(result);
      console.log("Result - ", result);
    } catch (e) {
      console.log("Error - ", e);
    }
  };

  status = async (uid, request_id) => {
    console.log(uid, request_id);
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

  autoComplete = async inn => {
    try {
      const result = await this.instance.get(
        `http://roaming.api.staging.keydisk.ru/navigator/${inn}`
      );
      console.log("Result - ", result);
      return result;
    } catch (e) {
      console.log("Error - ", e);
    }
  };
}

export default AxiosService;
