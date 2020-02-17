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

    this.setFormData = values => {
      const formData = new FormData();
      const data = {};

      if (!values?.sender_list) data.sender = values.sender;
      if (!values?.receiver_list) data.receiver = values.receiver;

      values?.agreement && formData.append("agreement", values.agreement);
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

  abonent = async values => {
    try {
      const result = await this.instance.post(
        "/abonent",
        this.setFormData(values),
        this.config.multipart
      );
      console.log("Result - ", result);
    } catch (e) {
      console.log("Error - ", e);
    }
  };

  operator = async values => {
    try {
      const result = await this.instance.post(
        "/operator",
        this.setFormData(values),
        this.config.multipart
      );
      console.log("Result - ", result);
    } catch (e) {
      console.log("Error - ", e);
    }
  };
}

export default AxiosService;
