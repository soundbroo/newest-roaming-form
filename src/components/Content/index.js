import React, { useState, useEffect } from "react";
import styled from "styled-components";

import RoamingState from "pages/RoamingState";

import Navigation from "components/Navigation";
import Form from "components/Common/Form";
import Snackbar from "components/Common/Snackbar";

import useSnackbar from "hooks/useSnackbar";

import AxiosService from "api";

const Content = () => {
  const axios = new AxiosService();

  const [activePage, setActivePage] = useState(0);
  const [query, setQuery] = useState(null);
  const { openState, messageState } = useSnackbar();

  useEffect(() => {
    const { search } = window.location;
    if (search.includes("?status")) {
      setActivePage(2);
      const statusId = search.replace(/\?status=/, "");
      axios.status(statusId).then(res => setQuery(res.data.text));
    }
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case 0:
      case 1:
        return (
          <Form
            activePage={activePage}
            setActivePage={setActivePage}
            openState={openState}
            messageState={messageState}
          ></Form>
        );
      case 2:
        return <RoamingState status={query} />;
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
      <Snackbar message={messageState.message} {...openState} />
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
