import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const MuiAlert = props => {
  return <Alert elevation={6} variant="filled" {...props} />;
};

const SnackBar = ({ message, open, color, delay, showSnackbar }) => {
  const handleClose = () => showSnackbar(null, null, false, null);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      autoHideDuration={delay || 10000}
      onClose={handleClose}
    >
      <MuiAlert onClose={handleClose} severity={color || "info"}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackBar;
