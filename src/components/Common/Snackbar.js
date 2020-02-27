import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const MuiAlert = props => {
  return <Alert elevation={6} variant="filled" {...props} />;
};

const SnackBar = ({ message, open, color, setOpen }) => {
  const handleClose = () => setOpen(false);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      autoHideDuration={10000}
      onClose={handleClose}
    >
      <MuiAlert onClose={handleClose} severity={color || "error"}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackBar;
