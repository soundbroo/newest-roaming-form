import axios from "axios";

class AxiosService {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:5000/"
    });
    this.config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    this.toJSON = value => {
      return JSON.stringify(value, 0, 2);
    };
  }

  login = async data => {
    const formData = new FormData();
    formData.append("login", this.toJSON(data.login));
    formData.append("password", this.toJSON(data.password));
    try {
      const result = await this.instance.post("/auth", formData, this.config);
      console.log("Result - ", result);
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
        this.config
      );
      console.log("Result - ", result);
    } catch (e) {
      console.log("Error - ", e);
    }
  };
}

export default AxiosService;
