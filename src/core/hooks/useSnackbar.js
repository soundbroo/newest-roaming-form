import { useState } from "react";

const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState(null);
  const [delay, setDelay] = useState(null);

  const showSnackbar = (message, color, open, delay) => {
    message !== null && setMessage(message);
    color !== null && setColor(color);
    delay !== null && setDelay(delay);
    open !== null && setOpen(open);
  };

  return [message, color, open, delay, showSnackbar];
};

export default useSnackbar;
