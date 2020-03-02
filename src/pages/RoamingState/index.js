import React, { useState, useEffect } from "react";
import AxiosService from "api";

const RoamingState = ({ status, result }) => {
  const axios = new AxiosService();

  useEffect(() => {
    if (result) console.log(result);
  }, [result]);

  const [requestStatus, setRequestStatus] = useState(null);

  if (result?.data.status === 0) {
    const uid = result.data.sender[0].input.id;
    const request_id = result.data.request_id;
    axios.status(uid, request_id).then(res => setRequestStatus(res));
    return <div>{requestStatus || "Тут пока пусто"} </div>;
  }

  return <div>{status || "Тут пока пусто"} </div>;
};

export default RoamingState;
