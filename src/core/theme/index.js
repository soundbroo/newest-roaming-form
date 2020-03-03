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
    MuiExpansionPanelSummary: {
      root: {
        minHeight: 58
      }
    },
    MuiSnackbar: {
      root: {
        maxWidth: 530,
        textAlign: "justify"
      }
    },
    MuiLinearProgress: {
      root: {
        // width: 150
      },
      colorPrimary: {
        background: "#4caf50"
      }
    }
  }
});

export const styledTheme = {};
