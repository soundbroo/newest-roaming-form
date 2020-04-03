import React, { useState } from "react";
import styled from "styled-components";
import {
  Person,
  Business,
  SignalCellularAlt,
  Menu as MenuIcon,
  AssignmentInd as AssignmentIndIcon,
  ListAlt as ListAltIcon
} from "@material-ui/icons";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ToolTip from "@material-ui/core/ToolTip";

import AcceptPopover from "components/Navigation/AcceptPopover";
import Logout from "components/Navigation/Logout";

import { MENU_ITEMS } from "constants";

const drawerWidth = 270;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginRight: 10,
    marginLeft: -19
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    paddingTop: 64
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: 64,
    [theme.breakpoints.down("xs")]: {
      width: 0
    },
    paddingTop: 64
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1
  },
  navIcon: {
    fontSize: 32
  }
}));

const Navigation = ({
  setAuth,
  isAuth,
  activePage,
  setActivePage,
  isFormValue,
  children
}) => {
  const isAcceptPopoverEnabled = localStorage.getItem("showNavigationDialog");

  const handlePopoverClick = event => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handleClick = (e, index) => {
    if (
      !isAcceptPopoverEnabled &&
      (activePage === 0 || activePage === 1) &&
      isFormValue
    ) {
      return handlePopoverClick(e);
    }
    return setActivePage(index);
  };

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const setDrawer = () => {
    setOpen(!open);
  };

  const setIcon = index => {
    switch (index) {
      case 0:
        return (
          <Person
            color={activePage === index ? "primary" : "disabled"}
            className={classes.navIcon}
          />
        );
      case 1:
        return (
          <Business
            color={activePage === index ? "primary" : "disabled"}
            className={classes.navIcon}
          />
        );
      case 2:
        return (
          <SignalCellularAlt
            color={activePage === index ? "primary" : "disabled"}
            className={classes.navIcon}
          />
        );
      case 3:
        return (
          <AssignmentIndIcon
            color={activePage === index ? "primary" : "disabled"}
            className={classes.navIcon}
          />
        );
      case 4:
        return (
          <ListAltIcon
            color={activePage === index ? "primary" : "disabled"}
            className={classes.navIcon}
          />
        );
    }
  };

  return (
    <NavigationWrapper>
      <AppBar position="fixed" className={classes.appBar}>
        <NavBar>
          <LeftNavBar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={setDrawer}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Title>Астрал.Роуминг ЭДО</Title>
          </LeftNavBar>
          {activePage === 1 && isAuth && <Logout setAuth={setAuth} />}
        </NavBar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <List>
          {MENU_ITEMS.map((text, index) => (
            <ToolTip key={index} title={!open ? text : ""}>
              <MenuItem
                button
                id={text}
                index={index}
                key={text}
                onClick={event => handleClick(event, index)}
              >
                <ListItemIcon>{setIcon(index)}</ListItemIcon>
                <ListItemText primary={text} />
              </MenuItem>
            </ToolTip>
          ))}
        </List>
        {!isAcceptPopoverEnabled ? (
          <AcceptPopover
            popoverAnchorEl={popoverAnchorEl}
            handlePopoverClose={handlePopoverClose}
            setActivePage={setActivePage}
          />
        ) : null}
      </Drawer>
      <main className={classes.content}>{children}</main>
    </NavigationWrapper>
  );
};

export default Navigation;

const NavigationWrapper = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 5;
  overflow-x: hidden;
  @media (max-width: 660px) {
  }
`;

const NavBar = styled(Toolbar)`
  min-height: 56px;
  @media (max-width: 660px) {
    min-height: 48px;
  }
`;

const LeftNavBar = styled.div`
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  max-width: 100%;
  min-width: 218px;
`;
const Title = styled.span`
  font-size: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const MenuItem = styled(ListItem)`
  :nth-child(0) {
    order: 0;
  }
  :nth-child(2) {
    order: 3;
  }
  :nth-child(4) {
    order: 2;
  }
`;
