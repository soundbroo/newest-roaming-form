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
  }

  login = async data => {
    const formData = new FormData();
    formData.append("login", JSON.stringify(data.login));
    formData.append("password", JSON.stringify(data.password));
    try {
      const result = await this.instance.post("/auth", formData, this.config);
      console.log("Result - ", result);
    } catch (e) {
      console.log("Error - ", e);
    }
  };

  sendData = async values => {
    const setFormData = values => {
      const formData = new FormData();
      const data = {
        sender: values.sender,
        receiver: values.receiver
      };
      formData.append("receiver_list", values.receiver_list);
      formData.append("data", JSON.stringify(data));
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
