import React, { useState, useEffect } from "react";

import OperatorsState from "components/RoamingState/OperatorsState";
import RequestStatus from "components/RoamingState/RequestStatus";

import AxiosService from "api";

const RoamingState = ({ status, response }) => {
  const axios = new AxiosService();

  console.log("ROAMINGSTATE", { status, response });

  const [requestStatus, setRequestStatus] = useState(null);

  if (response?.data.status === 0) {
    const uid = response.data.sender[0].input.id;
    const request_id = response.data.request_id;
    axios.status(uid, request_id).then(res => setRequestStatus(res));
  }

  return (
    <>
      {(status || requestStatus) && (
        <RequestStatus status={status} response={requestStatus} />
      )}
      <OperatorsState />
    </>
  );
};

export default RoamingState;
