import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Navigation from "components/Navigation";
import Form from "components/Common/Form";

const Content = () => {
  const [activePage, setActivePage] = useState(0);

  const renderContent = () => {
    switch (activePage) {
      case 0:
      case 1:
        return (
          <Form activePage={activePage} setActivePage={setActivePage}></Form>
        );
      case 2:
        return <div>Тут пока пусто</div>;
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
