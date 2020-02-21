import { useState } from "react";

const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  return {
    openState: { open, setOpen },
    messageState: { message, setMessage }
  };
};

export default useSnackbar;
