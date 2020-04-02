import React, { useState } from "react";
import styled from "styled-components";
import { Popover, FormControlLabel, Checkbox, Button } from "@material-ui/core";

import { ACCEPT_POPOVER_MESSAGES } from "constants";

const AcceptPopover = ({
  popoverAnchorEl,
  handlePopoverClose,
  setActivePage
}) => {
  const [answer, setAnswer] = useState(false);
  const handleChange = () => setAnswer(!answer);
  const handleAccept = () => {
    if (answer === true) {
      localStorage.setItem("showNavigationDialog", false);
    }
    handlePopoverClose();
    setActivePage(+popoverAnchorEl?.getAttribute("index"));
  };
  return (
    <Wrapper>
      <Popover
        id={!!popoverAnchorEl ? "simple-popover" : undefined}
        open={!!popoverAnchorEl}
        anchorEl={popoverAnchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Content>
          <div>{ACCEPT_POPOVER_MESSAGES.message}</div>
          <FormControlLabel
            control={
              <Checkbox
                checked={answer}
                onChange={handleChange}
                name="popover"
              />
            }
            label={ACCEPT_POPOVER_MESSAGES.dontShowAgain}
          />
          <Buttons>
            <Button
              variant="outlined"
              color="primary"
              onClick={handlePopoverClose}
            >
              Отмена
            </Button>
            <Button variant="outlined" color="primary" onClick={handleAccept}>
              Подтвердить
            </Button>
          </Buttons>
        </Content>
      </Popover>
    </Wrapper>
  );
};

export default AcceptPopover;

const Wrapper = styled.div``;

const Content = styled.div`
  max-width: 262px;
  padding: 12px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    flex: 1;
    :first-child {
      margin-right: 6px;
    }
    :last-child {
      margin-left: 6px;
    }
  }
`;
