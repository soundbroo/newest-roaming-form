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
        }
      }
    };
    this.toJSON = value => {
      return JSON.stringify(value, 0, 2).replace(/"/g, "");
    };
  }

  login = async data => {
    const formData = new FormData();
    formData.append("login", this.toJSON(data.login));
    formData.append("password", this.toJSON(data.password));
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

  send = async values => {
    const setFormData = values => {
      const formData = new FormData();
      const data = {
        sender: values.sender,
        receiver: values.receiver
      };
      formData.append("receiver_list", values.receiver_list);
      formData.append("data", this.toJSON(data));
      return formData;
    };

    try {
      const result = await this.instance.post(
        "/abonent",
        setFormData(values),
        this.config.multipart
      );
      console.log("Result - ", result);
    } catch (e) {
      console.log("Error - ", e);
    }
  };
}

export default AxiosService;
