import React from "react";
import Popover from "@material-ui/core/Popover";

const AcceptPopover = ({ Component }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Component onClick={handleClick} />
      <Popover
        id={open && "simple-popover"}
        open={false}
        anchorEl={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <div>The content of the Popover.</div>
      </Popover>
    </div>
  );
};

export default AcceptPopover;
