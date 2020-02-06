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
        <Tabs
          value={activePage}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab label="Клиентам" icon={<Person />} />
          <Tab label="Операторам" icon={<Business />} />
          <Tab label="Состояние роуминга" icon={<SignalCellularAlt />} />
        </Tabs>
      </Paper>
    </NavigationWrapper>
  );
};

export default Navigation;

const NavigationWrapper = styled.div`
  margin-bottom: 32px;
`;
