import React from "react";
import { render } from "react-dom";
import purple from "@material-ui/core/colors/purple";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import muiTheme from "theme";

import App from "./src/App";

render(
  <MuiThemeProvider theme={muiTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
