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
    MuiFormControl: {
      root: {
        width: "100%",
        paddingLeft: 10,
        paddingRight: 10
      }
    },
    MuiButton: {
      outlined: {
        padding: "4px 9px"
      }
    },
    MuiFormLabel: {
      root: {
        marginLeft: 10
      }
    },
    MuiExpansionPanel: {
      root: {
        width: "100%"
      }
    },
    MuiStepper: {
      root: {
        padding: "21px 12px"
      }
    },
    MuiStepLabel: {
      root: {
        width: 180
      },
      labelContainer: {
        textAlign: "center"
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: 14
      }
    },
    MuiSnackbar: {
      root: {
        maxWidth: 600
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        padding: "8px 24px"
      },
      colorPrimary: {
        background: "#4caf50"
      }
    }
  }
});

export const styledTheme = {};
