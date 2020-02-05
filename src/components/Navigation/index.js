import React, { useState } from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";

const Navigation = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Клиентам" />
        <Tab label="Операторам" />
        <Tab label="Состояние роуминга" />
      </Tabs>
    </Paper>
  );
};

export default Navigation;
