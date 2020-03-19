import React, { useState, useEffect } from "react";

import RequestStatus from "components/RoamingState/RequestStatus";

import AxiosService from "api";

const RoamingState = ({ status, response, setRequestStatus }) => {
  const axios = new AxiosService();

  const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    if (response?.data.status === 0) {
      const uid = response.data.sender[0].input.id;
      const request_id = response.data.request_id;
      axios.status(uid, request_id).then(res => {
        setRequestData(res);
        setRequestStatus(null);
      });
    }
  }, [response]);

  const [input, setInput] = useState();

  useEffect(() => {
    if (input) {
      const { id, request_number } = input.status;
      axios.status(id, request_number).then(res => {
        setRequestStatus(null);
        setRequestData(res);
      });
    }
  }, [input]);

  return (
    <RequestStatus
      status={status}
      response={requestData?.data?.text}
      input={input}
      setInput={setInput}
    />
  );
};

export default RoamingState;
