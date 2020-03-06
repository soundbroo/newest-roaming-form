import React, { useState, useEffect } from "react";
import styled from "styled-components";

import RoamingState from "pages/RoamingState";

import Navigation from "components/Navigation";
import Form from "components/Common/Form";
import Snackbar from "components/Common/Snackbar";

import { TEMP_MESSAGE, statuses } from "constants";

import useSnackbar from "hooks/useSnackbar";

import AxiosService from "api";

const Content = () => {
  const axios = new AxiosService();

  const [activePage, setActivePage] = useState(0);
  const [query, setQuery] = useState(null);
  const [response, setResponse] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  const [message, color, open, delay, showSnackbar] = useSnackbar();

  const snackbarProps = {
    message,
    color,
    delay,
    open,
    showSnackbar
  };

  useEffect(() => {
    const { search } = window.location;
    if (search.includes("?uid")) {
      setActivePage(2);
      const [user, query] = search.slice(1).split("?");
      const uid = user.replace(/\uid=/, "");
      const request_id = query.replace(/\D/g, "");

      if (query.includes("status")) {
        axios.status(uid, request_id).then(res => setQuery(res.data.text));
      }
      if (query.includes("request")) {
        axios.request(uid, request_id).then(res => setQuery(res.data.text));
      }
    }
  }, []);

  useEffect(() => {
    showSnackbar(TEMP_MESSAGE, statuses.info, true, 30000);
  }, []);

  const renderContent = () => {
    console.log("SWITCH", response);
    switch (activePage) {
      case 0:
      case 1:
        return (
          <Form
            activePage={activePage}
            setActivePage={setActivePage}
            snackbarProps={snackbarProps}
            response={response}
            setResponse={setResponse}
            requestStatus={requestStatus}
            setRequestStatus={setRequestStatus}
          />
        );
      case 2:
        return (
          <RoamingState
            status={query}
            response={requestStatus}
            setRequestStatus={setRequestStatus}
          />
        );
    }
  };

  return (
    <ContentWrapper>
      <Navigation
        style={{ width: 100 }}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <MainContent>{renderContent()}</MainContent>
      <Snackbar {...snackbarProps} />
    </ContentWrapper>
  );
};

export default Content;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
