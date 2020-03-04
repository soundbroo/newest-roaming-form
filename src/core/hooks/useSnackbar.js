import { useState } from "react";

const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState(null);
  const [delay, setDelay] = useState(null);
  return {
    openState: { open, setOpen },
    messageState: { message, setMessage },
    colorState: { color, setColor },
    delayState: { delay, setDelay }
  };
};

export default useSnackbar;
