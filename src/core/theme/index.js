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
      main: "#f48fb1",
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
        marginLeft: 10,
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "90%",
        whiteSpace: "nowrap"
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
    MuiStep: {
      root: {
        height: "inherit"
      }
    },
    MuiStepLabel: {
      root: {
        maxWidth: 180
      },
      labelContainer: {
        textAlign: "center"
      },
      iconContainer: {
        paddingRight: 0
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: 14
      }
    },
    MuiSnackbar: {
      root: {
        maxWidth: 600,
        left: "none",
        marginLeft: 8
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        padding: "8px 24px"
      }
    },
    MuiBadge: {
      dot: {
        width: 12,
        height: 12,
        borderRadius: 50,
        left: 9
      }
    },
    MuiToolbar: {
      root: {
        display: "flex",
        justifyContent: "space-between"
      }
    },
    MuiList: {
      root: {
        display: "flex",
        flexDirection: "column"
      }
    }
  }
});

export const styledTheme = {
  palette: {
    primary: "#6a1b9a",
    primaryLight: "#9243c1",
    grey: "#cecece",
    darkGrey: "#828282",
    error: "#ff6e5f",
    errorLight: "#ffa299",
    validationError: "#f44336",
    success: "#44d678"
  }
};
