import React from "react";
import { InputAdornment, Tooltip } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";

const EndInputAdornment = ({ title }) => (
  <InputAdornment position="end">
    <Tooltip placement="bottom-end" title={title}>
      <HelpIcon color="primary" />
    </Tooltip>
  </InputAdornment>
);

export default EndInputAdornment;
