import React from "react";
import styled from "styled-components";
import { Tooltip, Badge } from "@material-ui/core";
import IconError from "@material-ui/icons/Error";

const ErrorTooltipIcon = ({ responseText, invisible }) => (
  <Tooltip
    disableHoverListener={!responseText}
    title={responseText}
    placement="top-start"
  >
    <Badge
      badgeContent="?"
      color="secondary"
      variant="dot"
      invisible={invisible || false}
    >
      <ErrorIcon />
    </Badge>
  </Tooltip>
);

export default ErrorTooltipIcon;

const ErrorIcon = styled(IconError)`
  color: ${p => p.theme.palette.error};
  z-index: 2;
`;
