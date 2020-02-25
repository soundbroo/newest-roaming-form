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

    this.setFormData = ({ values, activePage }) => {
      const formData = new FormData();
      let data = {};
      const prepareData = type => {
        if (data?.[type]) {
          data?.[type].map(type => {
            // switch (activePage) {
            //   case 0: {
            //     return { ...type, id: `2AE${type.id}` };
            //   }
            //   case 1: {
            //     if (type === "sender") {
            //       const operator = localStorage.getItem("operator");
            //       console.log({ ...type, id: `${operator}${type.id}` });
            //       return { ...type, id: `${operator}${type.id}` };
            //     }
            //     if (type === "receiver") {
            //       return { ...type, id: `2AE${type.id}` };
            //     }
            //   }
            // }

            if (type?.inn?.length === 10) {
              delete type.firstname;
              delete type.lastname;
              delete type.patronymic;
            } else if (type?.inn?.length === 12) {
              delete type.kpp;
              delete type.name;
            }
          });
        }
      };

      if (!values?.sender_list) data.sender = values.sender;
      if (!values?.receiver_list) data.receiver = values.receiver;

      prepareData("sender");
      prepareData("receiver");

      values?.agreement && formData.append("agreement", values.agreement);
      values?.request_id && formData.append("request_id", values.request_id);
      values?.sender_list && formData.append("sender_list", values.sender_list);
      values?.receiver_list &&
        formData.append("receiver_list", values.receiver_list);
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

  abonent = async ({ values, activePage }) => {
    try {
      const result = await this.instance.post(
        "/abonent",
        this.setFormData({ values, activePage }),
        this.config.multipart
      );
      console.log("Result - ", result);
    } catch (e) {
      console.log("Error - ", e);
    }
  };

  operator = async ({ values, activePage }) => {
    try {
      const result = await this.instance.post(
        "/operator",
        this.setFormData({ values, activePage }),
        this.config.multipart
      );
      console.log("Result - ", result);
    } catch (e) {
      console.log("Error - ", e);
    }
  };

  status = async id => {
    try {
      const result = await this.instance.get(`/abonent/status/${id}`);
      console.log("Result - ", result);
      return result;
    } catch (e) {
      console.log("Error - ", e);
    }
  };
}

export default AxiosService;
