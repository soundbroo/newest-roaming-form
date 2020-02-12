import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000"
});

export const sendData = values => {
  const setFormData = values => {
    console.log(values);
    const formData = new FormData();
    formData.append("agent_list", values.receiver_list);
    console.log(formData);
    return formData;
  };

  instance.post("/data", values, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
