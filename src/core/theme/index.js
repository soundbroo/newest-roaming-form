import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      light: purple[700],
      main: purple[800],
      dark: purple[900],
      white: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d"
    }
  },
  overrides: {
    MuiTextField: {
      root: {
        width: "100%",
        paddingLeft: 10,
        paddingRight: 10
      }
    },
    MuiFormLabel: {
      root: {
        marginLeft: 10
      }
    }
  }
});

export const styledTheme = {};
