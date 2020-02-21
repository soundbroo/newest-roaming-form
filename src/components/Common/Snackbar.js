import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const MuiAlert = props => {
  return <Alert elevation={6} variant="filled" {...props} />;
};

const SnackBar = ({ message, open, setOpen }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <MuiAlert onClose={() => setOpen(false)} severity="error">
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackBar;
