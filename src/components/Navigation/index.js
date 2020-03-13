import React from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";
import { Person, Business, SignalCellularAlt } from "@material-ui/icons";
import styled from "styled-components";

const Navigation = ({ activePage, setActivePage }) => {
  const handleChange = (event, newValue) => {
    setActivePage(newValue);
  };

  return (
    <NavigationWrapper>
      <Paper>
        <NavTabs
          value={activePage}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
        >
          <NavTab label="Клиентам" icon={<Person />} />
          <NavTab label="Операторам" icon={<Business />} />
          <NavTab label="Состояние роуминга" icon={<SignalCellularAlt />} />
        </NavTabs>
      </Paper>
    </NavigationWrapper>
  );
};

export default Navigation;

const NavigationWrapper = styled.div`
  position: sticky;
  margin-bottom: 32px;
  top: 0;
  z-index: 5;
  @media (max-width: 660px) {
    margin-bottom: 0;
  }
`;

const NavTabs = styled(Tabs)`
  @media (max-width: 660px) {
    height: 60px;
  }
`;

const NavTab = styled(Tab)`
  @media (max-width: 660px) {
    span {
      font-size: 0;
    }
    svg {
      font-size: 36px;
      margin-bottom: 16px !important;
    }
  }
`;
