import React from "react";
import { render } from "react-dom";

import { MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import { muiTheme, styledTheme } from "theme";

import App from "./src/App";

render(
  <MuiThemeProvider theme={muiTheme}>
    <ThemeProvider theme={styledTheme}>
      <App />
    </ThemeProvider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
