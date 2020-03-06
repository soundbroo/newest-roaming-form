import React, { useState, useEffect } from "react";

import OperatorsState from "components/RoamingState/OperatorsState";
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

  return (
    <>
      {(status || requestData) && (
        <RequestStatus status={status} response={requestData?.data?.text} />
      )}
      <OperatorsState />
    </>
  );
};

export default RoamingState;
